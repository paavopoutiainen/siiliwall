import React, { useEffect, useReducer, useState } from "react";

import uuid from "uuid/v4";
import DnDContext from "./components/DragDropContext";

export const MyContext = React.createContext();

const Cardreducer = (columns, action) => {
  switch (action.type) {
    case "GET_DATA":
      console.log("testi col", columns);
      console.log("testi dataa", action.tiko);
      return {
        ...columns,
        ...action.tiko
      };
    case "ADD_CARD":
      const destinationColumn = columns[action.id];
      const destItems = [...destinationColumn.items];
      return {
        ...columns,
        [action.id]: {
          ...destinationColumn,
          items: destItems.concat(action.item)
        }
      };
    case "MOVE":
      if (!action.result.destination) {
        return { ...columns };
      }
      const { source, destination } = action.result;
      console.log(action.result);
      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        console.log("LÄHDE", sourceColumn);
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        return {
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems
          }
        };
      } else {
        const column = columns[source.droppableId];
        console.log("COLUMNNN", column);
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        return {
          ...columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems
          }
        };
      }
    case "NEW_COL_NAME":
      return {
        ...columns,
        [action.id]: { name: action.name, items: action.items }
      };
    case "ADD_NEW_COL":
      return {
        ...columns,
        [uuid()]: {
          name: "New column",
          items: []
        }
      };
    case "DELETE":
      const { id, content } = action.item;
      const desColumn = columns[action.id];
      const title = desColumn.name;
      const dsItem = [...desColumn.items];
      return {
        ...columns,
        [action.id]: {
          name: title,
          items: dsItem.filter(item => item.id !== id)
        }
      };
    case "DELETE_COLUMN":
      console.log(action.id);
      console.log("collaajat", columns[action.id]);
      console.log("pitäs poistaa", delete columns[action.id]);

      return {
        ...columns,
        ...delete columns[action.id]
      };

    default:
      return columns;
  }
};

const itemsFromBackend = [
  {
    id: "eka",
    content: "first things first"
  },
  {
    id: "toka",
    content: "aaaa"
  },
  {
    id: "kolmas",
    content: "bbbbb"
  },
  {
    id: "neljäs",
    content: "ccccc"
  }
];

const columnsFromBackend = {
  Colli_1: {
    name: "Epic",
    items: itemsFromBackend
  },
  Colli_2: {
    name: "Todo",
    items: []
  },
  Colli_3: {
    name: "In Progress",
    items: []
  },
  COlli_4: {
    name: "Done",
    items: []
  }
};

function App() {
  const [columns, dispatch] = useReducer(Cardreducer, {});
  const [useData, setUseData] = useState({});
  console.log("DATAAAAAAAA", columns);

  useEffect(() => {
    const url = "https://siiliwall.herokuapp.com/columns";
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        const tiko = Object.assign({}, responseJson);
        console.log("tiko", tiko);
        console.log("oikeat", columns);
        // dispatch({ type: "GET_DATA", tiko });
        // setUseData(tiko);

        // const palu = Object.assign([], tiko);
        // console.log("palu", palu);
        // const rapu = JSON.stringify(palu);
        // console.log("rapu", rapu);

        console.log("Tämä tulee jostain", responseJson);
        //console.log(JSON.stringify(tiko));
        // const paku = JSON.stringify(tiko);
        // const taku = Object.entries(tiko);
        // console.log("taku", taku);
      })
      .catch(error => {});
  }, []);

  return (
    <MyContext.Provider value={{ columns, dispatch }}>
      <DnDContext></DnDContext>
    </MyContext.Provider>
  );
}

export default App;
