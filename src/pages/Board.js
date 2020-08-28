import React, { useEffect, useReducer, useState} from "react";
import Cardreducer from "./BoardReducer";
import DnDContext from "../components/DragDropContext";
import _ from "lodash";

export const MyContext = React.createContext();

const Board = () => {
  const [columns, dispatch] = useReducer(Cardreducer, {});
  const [useData, setUseData] = useState({});
  const [boardVal, setBoardVal] = useState();

  useEffect(() => {
    console.log("testing pull request")
    const url = "http://siiliwall.herokuapp.com/boards";
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        const result = responseJson.find(({ boardId }) => boardId);
        const boardValue = result.boardId;
        setBoardVal(boardValue);
        const columnObject = Object.assign({}, result.columns);
        setUseData(columnObject);
        dispatch({ type: "GET_DATA", columnObject: columnObject, result });
      })
      .catch(error => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const url = "http://siiliwall.herokuapp.com/boards";
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          const result = responseJson.find(({ boardId }) => boardId);
          const boardValue = result.boardId;
          setBoardVal(boardValue);
          const columnObject = Object.assign({}, result.columns);
  
          if (!_.isEqual(columnObject, useData)) {
            dispatch({ type: "GET_DATA", columnObject, result }); 
            setUseData(columnObject);
          }
        })
        .catch((error) => {});
    }, 5000);
    return () => clearInterval(interval);
  }, [columns]);

  return (
    <>
      <MyContext.Provider value={{ columns, dispatch, boardVal }}>
        <DnDContext></DnDContext>
      </MyContext.Provider>
    </>
  );
}

export default Board;
