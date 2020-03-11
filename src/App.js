import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import axios from 'axios';

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
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
  const [columns, setColumns] = useState({});
  const [stickerInput, setStickerInput] = useState("");
  const [input, setInput] = useState({ id: null, status: false });
  const [newTitle, setNewTitle] = useState({
    status: false,
    id: null,
    newName: ""
  });

  useEffect(() => {
    getResponse()
  }, [])

  const getResponse = () => {
    axios.get('http://siiliwall.me/testi.json')
      .then((response) => {
        setColumns(response.data)
      }).catch((error) => {
        console.log(error)
      }
      )
  }

  const addNewStickie = id => {
    setInput({ id: id, status: true });
    const destinationColumn = columns[id];
    const destItems = [...destinationColumn.items];
    const newCard = { id: uuid(), content: stickerInput };
    if (newCard.content) {
      setColumns({
        ...columns,
        [id]: {
          ...destinationColumn,
          items: destItems.concat(newCard)
        }
      });
      setInput({ id: null, status: false });
    }
    setStickerInput("");
  };

  function addColumn() {
    const newColumn = {
      ...columns,
      [uuid()]: {
        name: "New column",
        items: []
      }
    };
    setColumns(newColumn);
  }

  const renameColumn = id => {
    setNewTitle({ ...newTitle, status: !newTitle.status, id: id });
    const destinationColumn = columns[id];
    const destItems = [...destinationColumn.items];

    if (newTitle.newName) {
      setNewTitle({
        ...newTitle,
        status: false,
        id: null,
        newName: ""
      });
      setColumns({
        ...columns,
        [id]: { name: newTitle.newName, items: destItems }
      });
    }
  };
  const deleteCard = (ids, index, item) => {
    const { id, content } = item;
    const destinationColumn = columns[ids];
    const title = destinationColumn.name;
    const destItems = [...destinationColumn.items];
    setColumns({
      ...columns,
      [ids]: {
        name: title,
        items: destItems.filter(item => item.id !== id)
      }
    });
  };

  return (
    <div>
      <button onClick={addColumn}>Add new column</button>

      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div
                key={id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                {newTitle.status && newTitle.id === id ? (
                  <>
                    <input
                      id={id}
                      type='text'
                      defaultValue={column.name}
                      onChange={e =>
                        setNewTitle({ ...newTitle, newName: e.target.value })
                      }
                    ></input>
                    <button onClick={() => renameColumn(id, newTitle.name)}>
                      save name
                    </button>
                  </>
                ) : (
                    <h2 onClick={() => renameColumn(id)}>{column.name}</h2>
                  )}
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={id} key={id}>
                    {(provided, snapshot) => {
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
                          {column.items.map((item, index) => {
                            return (
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
                                      <button
                                        onClick={() =>
                                          deleteCard(id, index, item)
                                        }
                                      >
                                        x
                                      </button>
                                    </div>
                                  );
                                }}
                              </Draggable>
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
    </div>
  );
}

export default App;
