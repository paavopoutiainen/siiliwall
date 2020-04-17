import React, { useState, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Dropps from "../components/Droppable";
import { MyContext } from "../pages/Board";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const DnDContext = () => {
  const tiko = useContext(MyContext);
  const [newTitle, setNewTitle] = useState({
    status: false,
    id: null,
    newName: "",
  });

  const renameColumn = (id) => {
    setNewTitle({ ...newTitle, status: !newTitle.status, id: id });
    const destinationColumn = tiko.columns[id]; 
    const destItems = [...destinationColumn.items];

    if (newTitle.newName) {
      setNewTitle({
        ...newTitle,
        status: false,
        id: null,
        newName: "",
      });
      tiko.dispatch({
        type: "NEW_COL_NAME",
        id: id,
        name: newTitle.newName,
        items: destItems,
        dest: destinationColumn,
      });
    }
  };

  const deleteCol = (result, id, removeId) => {
    tiko.dispatch({ type: "DELETE_COLUMN", result, id, removeId });
    const requestOptions = {
      method: "DELETE",
    };
    fetch(
      `https://siiliwall.herokuapp.com/board/${tiko.boardVal}/deletecolumn/${removeId}`,
      requestOptions
    )
      .then((response) => response.text())
      .catch((error) => console.log("Error detected: " + error));
  };

  const addCol = () => {
    tiko.dispatch({ type: "ADD_NEW_COL", tiko });
  };
  
  return (
    <div>
      <Button variant='contained' color='primary' onClick={() => addCol()}>
        Add new column
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          height: "100%",
          margin: 20,
        }}
      >
        <DragDropContext
          onDragEnd={(result) => tiko.dispatch({ type: "MOVE", result, tiko })}
        >
          {Object.entries(tiko.columns).map(([id, column]) => {
            return (
              <div
                key={id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                }}
              >
                {newTitle.status && newTitle.id === id ? (
                  <>
                    <form
                      style={{
                        padding: "9px 0px 9px 0px",
                        display: "flex",
                        overflow: "auto",
                        width: "95%",
                        marginBottom: "10px",
                      }}
                    >
                      <TextField
                        style={{ padding: "0px 5px 0px 5px" }}
                        id='outlined-basic'
                        label='Rename column'
                        variant='outlined'
                        size='small'
                        id={id}
                        type='text'
                        defaultValue={column.name}
                        onChange={(e) =>
                          setNewTitle({ ...newTitle, newName: e.target.value })
                        }
                      ></TextField>
                      <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={() => renameColumn(id, newTitle.name)}
                      >
                        save
                      </Button>
                    </form>
                  </>
                ) : (
                  <h2
                    style={{
                      fontSize: 20,
                      margin: 10,
                      padding: 5,
                    }}
                    onClick={() => renameColumn(id)}
                  >
                    {column.name}
                  </h2>
                )}
                <div style={{ margin: 8 }}>
                  <Dropps
                    id={id}
                    column={column}
                    columnss={tiko.columns}
                  ></Dropps>
                  {!tiko.columns[id].items.length && (
                    <Button
                      style={{ marginTop: 10 }}
                      variant='contained'
                      color='secondary'
                      onClick={(result) => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this column?"
                          )
                        )
                          deleteCol(result, id, column.columnId);
                      }}
                    >
                      delete
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default DnDContext;
