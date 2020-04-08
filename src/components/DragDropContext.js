import React, { useState, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Dropps from "../components/Droppable";
import { MyContext } from "../App";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const DnDContext = () => {
  const tiko = useContext(MyContext);
  const [newTitle, setNewTitle] = useState({
    status: false,
    id: null,
    newName: ""
  });

  const renameColumn = id => {
    console.log("haloo");
    setNewTitle({ ...newTitle, status: !newTitle.status, id: id });
    const destinationColumn = tiko.columns[id];
    console.log("dessi col", destinationColumn);
    const destItems = [...destinationColumn.items];
    console.log("Dessi item", destItems);

    if (newTitle.newName) {
      setNewTitle({
        ...newTitle,
        status: false,
        id: null,
        newName: ""
      });
      tiko.dispatch({
        type: "NEW_COL_NAME",
        id: id,
        name: newTitle.newName,
        items: destItems
      });
    }
  };

  const deleteCol = (result, id, removeId) => {
    console.log(removeId);
    tiko.dispatch({ type: "DELETE_COLUMN", result, id });
    // const requestOptions = {
    //   method: "DELETE"
    // };

    // fetch(
    //   `https://siiliwall.herokuapp.com/board/${tiko.boardVal}/deletecolumn/${removeCol}`,
    //   requestOptions
    // )
    //   .then(response => response.text())
    //   .then(data => console.log(data))
    //   .catch(error => console.log("Error detected: " + error));
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
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={result => tiko.dispatch({ type: "MOVE", result, tiko })}
        >
          {Object.entries(tiko.columns).map(([id, column]) => {
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
                    <form
                      style={{
                        padding: "9px 0px 9px 0px",
                        display: "flex",
                        overflow: "auto",
                        width: "95%",
                        marginBottom: "10px"
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
                        onChange={e =>
                          setNewTitle({ ...newTitle, newName: e.target.value })
                        }
                      ></TextField>

                      <Button
                        // style={{ margin: 10 }}
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
                  <h2 onClick={() => renameColumn(id)}>{column.name}</h2>
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
                      onClick={result => {
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
