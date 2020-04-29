import React, { useState, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Dropps from "../components/Droppable";
import { MyContext } from "../pages/Board";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import './styles.css';

const DnDContext = () => {
  const boardContext = useContext(MyContext);
  const [newTitle, setNewTitle] = useState({
    status: false,
    id: null,
    newName: "",
  });

  const renameColumn = (id) => {
    setNewTitle({ ...newTitle, status: !newTitle.status, id: id });
    const destinationColumn = boardContext.columns[id]; 
    const destItems = [...destinationColumn.items];

    if (newTitle.newName) {
      setNewTitle({
        ...newTitle,
        status: false,
        id: null,
        newName: "",
      });
      boardContext.dispatch({
        type: "NEW_COL_NAME",
        id: id,
        name: newTitle.newName,
        items: destItems,
        dest: destinationColumn,
      });
    }
  };

  const deleteCol = (result, id, removeId) => {
    boardContext.dispatch({ type: "DELETE_COLUMN", result, id, removeId });
    const requestOptions = {
      method: "DELETE",
    };
    fetch(
      `https://siiliwall.herokuapp.com/board/${boardContext.boardVal}/deletecolumn/${removeId}`,
      requestOptions
    )
      .then((response) => response.text())
      .catch((error) => console.log("Error detected: " + error));
  };

  const addCol = () => {
    boardContext.dispatch({ type: "ADD_NEW_COL", tiko: boardContext });
  };
  
  return (
    <div className='body'>
      <Button variant='contained' color='primary' onClick={() => addCol()} style={{marginBottom: 20}}>
        Add new column
      </Button>

      <div className='flex-container'>
        <DragDropContext
          onDragEnd={(result) => boardContext.dispatch({ type: "MOVE", result, tiko: boardContext })}
        >
          {Object.entries(boardContext.columns).map(([id, column]) => {
            return (
              <div key={id}>
                {newTitle.status && newTitle.id === id ? (
                  <>
                    <form className='column-rename-form'>
                      <TextField
                        style={{ padding: "0px 5px 0px 5px" }}
                        id='outlined-basic'
                        label='Rename Column'
                        variant='outlined'
                        size='small'
                        type='text'
                        id={id}                      
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
                  <h2 className='column-name'
                    onClick={() => renameColumn(id)}
                  >
                    {column.name}
                  </h2>
                )}
                <div className='column-gap'>
                  <Dropps
                    id={id}
                    column={column}
                  ></Dropps>
                  {!boardContext.columns[id].items.length && (
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
