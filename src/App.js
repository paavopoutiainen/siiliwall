import React, { useEffect, useReducer, useState } from "react";

import uuid from "uuid/v4";
import DnDContext from "./components/DragDropContext";

export const MyContext = React.createContext();

const Cardreducer = (columns, action) => {
  switch (action.type) {
    case "GET_DATA":
      const { boardId } = action.result;

      const jaha = Object.entries(action.tiko).map((o, index) =>
        Object.assign({ key: boardId }, ...o)
      );
      return {
        ...columns,
        ...jaha,
      };
    case "ADD_CARD":
      const destinationColumn = columns[action.id];
      const destItems = [...destinationColumn.items];
      return {
        ...columns,
        [action.id]: {
          ...destinationColumn,
          items: destItems.concat(action.item),
        },
      };
    case "MOVE":
      if (!action.result.destination) {
        return { ...columns };
      }
      const { source, destination } = action.result;
      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        return {
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        };
      } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        return {
          ...columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems,
          },
        };
      }
    case "NEW_COL_NAME":
      console.log("HALOOOOO", action);
      console.log("name", action.name, "Items", action.items);
      console.log("col id ", action.dest.columnId);
      console.log("name ", action.name);
      console.log("name ", action.dest.columnLimit);
      console.log("items", action.dest.items);

      const putMethod = {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          columnId: action.dest.columnId,
          name: action.name,
          columnLimit: action.dest.columnLimit,
          items: action.dest.items,
        }),
      };
      fetch(
        `https://siiliwall.herokuapp.com/editcolumn/${action.dest.columnId}`,
        putMethod
      )
        .then((response) => response.text())
        .then((data) => console.log(data))
        .catch((error) => console.log("Error detected: " + error));

      return {
        ...columns,
        [action.id]: { name: action.name, items: action.items },
      };
    case "ADD_NEW_COL":
      const uidu = uuid();
      const colId = Date.now();
      const colKey = Object.keys(action.tiko.columns).length + 1;

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          columnId: colId,
          name: "New column",
          items: [],
        }),
      };

      fetch(
        `https://siiliwall.herokuapp.com/boardss/${action.tiko.boardVal}/columns`,
        requestOptions
      )
        .then((response) => response.text())
        .then((data) => console.log(data))
        .catch((error) => console.log("Error detected: " + error));
      return {
        ...columns,
        [uuid()]: {
          key: action.tiko.boardVal,
          columnId: colId,
          name: "New column",
          items: [],
        },
      };
    case "DELETE":
      const { id, content } = action.item;
      const desColumn = columns[action.id];
      const desColId = desColumn.columnId;
      const title = desColumn.name;
      const dsItem = [...desColumn.items];
      return {
        ...columns,
        [action.id]: {
          columnId: desColId,
          name: title,
          items: dsItem.filter((item) => item.id !== id),
        },
      };
    case "DELETE_COLUMN":
      console.log("MISSSSÄÄ MUN DELETE");
      console.log(action.id);
      console.log(columns[action.id]);
      return {
        ...delete columns[action.id],
        ...columns,
      };

    default:
      return columns;
  }
};

const itemsFromBackend = [
  {
    id: "eka",
    content: "first things first",
  },
  {
    id: "toka",
    content: "aaaa",
  },
  {
    id: "kolmas",
    content: "bbbbb",
  },
  {
    id: "neljäs",
    content: "ccccc",
  },
];

const columnsFromBackend = {
  Colli_1: {
    name: "Epic",
    items: itemsFromBackend,
  },
  Colli_2: {
    name: "Todo",
    items: [],
  },
  Colli_3: {
    name: "In Progress",
    items: [],
  },
  COlli_4: {
    name: "Done",
    items: [],
  },
};

function App() {
  const [columns, dispatch] = useReducer(Cardreducer, {});
  const [useData, setUseData] = useState({});
  const [boardVal, setBoardVadl] = useState();
  console.log("DATAAAAAAAA", columns);

  useEffect(() => {
    const url = "http://siiliwall.herokuapp.com/boards";
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        const result = responseJson.find(({ boardId }) => boardId);
        const boardValue = result.boardId;
        setBoardVadl(boardValue);

        console.log("ressun colu", result.columns);
        const tiko = Object.assign({}, result.columns);
        console.log("oikeat", columns);
        dispatch({ type: "GET_DATA", tiko, result });
        console.log("Tämä tulee DB", responseJson);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <MyContext.Provider value={{ columns, dispatch, boardVal }}>
        <DnDContext></DnDContext>
      </MyContext.Provider>
    </>
  );
}

export default App;
