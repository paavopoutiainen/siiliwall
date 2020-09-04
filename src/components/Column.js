import React, { useState, useContext } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import { MyContext } from "../pages/BoardView";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";

//TODO: refactor cards to their own components

const Column = ({ id, column }) => {
  const [input, setInput] = useState({ id: null, status: false });
  const [cardInput, setCardInput] = useState("");
  const context = useContext(MyContext);
  
  const addNewCard = (id) => {
    setInput({ id: id, status: true });
    const destinationColumn = context.columns[id].columnId;
    const newCard = {
      id: uuid(),
      content: cardInput,
    };
    if (newCard.content) {
      context.dispatch({
        type: "ADD_CARD",
        id: id,
        item: newCard,
      });
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(newCard),
      };
      fetch(
        `https://siiliwall.herokuapp.com/columnss/${destinationColumn}/cards`,
        requestOptions
      )
        .then((response) => response.text())
        .catch((error) => {});
      setInput({ id: null, status: false });
    }
    setCardInput("");
  };
  const deleteCard = (id, item) => {
    const delColumn = context.columns[id].columnId;
    context.dispatch({
      type: "DELETE",
      id,
      item,
    });
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    fetch(
      `https://siiliwall.herokuapp.com/${delColumn}/deletecard/${item.id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((data) => {})
      .catch((error) => {});
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
                minHeight: 500,
                borderRadius: "5px",
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
                            padding: 10,
                            margin: "0 0 5px 0",
                            borderRadius: "5px",
                            minHeight: "50px",
                            backgroundColor: snapshot.isDragging
                              ? "#fff"
                              : "#fff",
                            color: "#000",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {item.content}
                          <IconButton
                            aria-label='delete'
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this item?"
                                )
                              )
                                deleteCard(id, item);
                            }}
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
                <TextField
                  size='small'
                  id='outlined-full-width'
                  fullWidth
                  label='Sticky'
                  variant='outlined'
                  id={id}
                  type='text'
                  value={cardInput}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      addNewCard(id);
                    }
                  }}
                  onChange={(e) => setCardInput(e.target.value)}
                ></TextField>
              )}
              <Button
                type='button'
                style={{ margin: 10 }}
                variant='contained'
                color='primary'
                onClick={() => addNewCard(id)}
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

export default Column;
