import React, { useState, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Dropps from "../components/Droppable";
import { MyContext } from "../App";

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

  return (
    <div>
      <button onClick={() => tiko.dispatch({ type: "ADD_NEW_COL" })}>
        Add new column
      </button>

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
                  <Dropps
                    id={id}
                    column={column}
                    columnss={tiko.columns}
                  ></Dropps>
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
