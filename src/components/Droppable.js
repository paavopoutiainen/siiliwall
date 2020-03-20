import React, { useState, useContext } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import { MyContext } from "../App";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";

const Dropps = ({ id, column }) => {
  const [input, setInput] = useState({ id: null, status: false });
  const [stickerInput, setStickerInput] = useState("");
  const context = useContext(MyContext);

  const addNewStickie = (id, event) => {
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
                          <IconButton
                            aria-label='delete'
                            onClick={() =>
                              context.dispatch({
                                type: "DELETE",
                                id,
                                index,
                                item
                              })
                            }
                          >
                            <DeleteIcon
                              style={{ color: "black" }}
                              fontSize='small'
                            />
                          </IconButton>
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}

              {provided.placeholder}
              {input.id === id && input.status === true && (
                <form onSubmit={() => addNewStickie(id)}>
                  <TextField
                    size='small'
                    id='outlined-full-width'
                    fullWidth
                    label='Sticky'
                    variant='outlined'
                    id={id}
                    type='text'
                    value={stickerInput}
                    onChange={e => setStickerInput(e.target.value)}
                  ></TextField>
                </form>
              )}
              <Button
                type='submit'
                style={{ margin: 10 }}
                variant='contained'
                color='primary'
                onClick={() => addNewStickie(id)}
              >
                + add new
              </Button>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default Dropps;
