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
    newName: ""
  });

  const renameColumn = id => {
    setNewTitle({ ...newTitle, status: !newTitle.status, id: id });
    const destinationColumn = tiko.columns[id]; 
    const destItems = [...destinationColumn.items];

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

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        onClick={() => tiko.dispatch({ type: "ADD_NEW_COL" })}
      >
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
                        width: "95%"
                      }}
                    >
                      <TextField
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
                        style={{ margin: 10 }}
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
                      onClick={result =>
                        tiko.dispatch({ type: "DELETE_COLUMN", result, id })
                      }
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
