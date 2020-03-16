import React, { useState, useContext } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import { MyContext } from "../App";

const Dropps = ({ id, column }) => {
  const [input, setInput] = useState({ id: null, status: false });
  const [stickerInput, setStickerInput] = useState("");
  const context = useContext(MyContext);

  const addNewStickie = id => {
    setInput({ id: id, status: true });
    const destinationColumn = context.columns[id];
    const destItems = [...destinationColumn.items];
    const newCard = { id: uuid(), content: stickerInput };
    if (newCard.content) {
      context.dispatch({
        type: "ADD_CARD",
        id: [id],
        des: destItems,
        item: newCard
      });
      setInput({ id: null, status: false });
    }
    setStickerInput("");
  };
  return (
    <div>
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
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                              context.dispatch({
                                type: "DELETE",
                                id,
                                index,
                                item
                              })
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
              <button onClick={() => addNewStickie(id)}>+ add new</button>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default Dropps;
