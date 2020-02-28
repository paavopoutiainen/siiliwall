import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import ActionButton from "./components/ActionButton";

const itemsFromBackend = [
  {
    id: "eka",
    content: "first things first"
  },
  {
    id: "toka",
    content: "Second things ar the hardest"
  },
  {
    id: "kolmas",
    content: "Second things ar the hardest"
  },
  {
    id: "neljäs",
    content: "Second things ar the hardest"
  }
];

const columnsFromBackend = {
  Colli_1: {
    name: "Epic",
    items: itemsFromBackend
  },
  Colli_2: {
    name: "Todo",
    items: []
  },
  Colli_3: {
    name: "In Progress",
    items: []
  },
  COlli_4: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  console.log("result", result);
  // console.log("Ondrag col", columns);
  // console.log("Ondrag set", setColumns);
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    console.log("des id", destination.droppableId);
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    console.log("destcol", destColumn);
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    console.log("destinationItems", destItems);
    const [removed] = sourceItems.splice(source.index, 1);
    console.log("removed", removed);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function App() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [stickerInput, setStickerInput] = useState("");
  const [input, setInput] = useState({ id: null, status: false });
  console.log("stickerrr", stickerInput);
  console.log("columns", columns);

  const addNewStickie = id => {
    setInput({ id: id, status: true });
    console.log("des id:", id);
    const destinationColumn = columns[id];
    const destItems = [...destinationColumn.items];

    console.log("testi", destItems);

    const tiko = { id: uuid(), content: stickerInput };

    if (tiko.content) {
      setColumns({
        ...columns,
        [id]: {
          ...destinationColumn,
          items: destItems.concat(tiko)
        }
      });
      setInput({ id: null, status: false });
    }
    setStickerInput("");

    //const searchedId = Object.entries(columns).find( => columns.id === id);
    //console.log(searchedId);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      {/* Alue joka hallitsee Drag n Drop aluetta */}
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {/* Object entries poimii columns:ista id ja column parin stringinä */}
        {Object.entries(columns).map(([id, column]) => {
          console.log("id", id, "columns", column);
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                {/*Tiputettavat alueet jotka rendataan  tarjotaan id: columneille */}
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    console.log("provided", provided);
                    console.log("snapshot", snapshot);
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          backgroundColor: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {/* Columin sisällä olevien itemien rendaus joilla on raahattava ominaisuus  */}
                        {column.items.map((item, index) => {
                          return (
                            console.log("item", item, "index", index),
                            (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            )
                          );
                        })}
                        {provided.placeholder}
                        {input.id === id && input.status === true && (
                          <input
                            id={id}
                            type='text'
                            value={stickerInput}
                            onChange={e => setStickerInput(e.target.value)}
                          ></input>
                        )}

                        <button onClick={() => addNewStickie(id)}>
                          + add new
                        </button>
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
