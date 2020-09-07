import React, { useEffect, useReducer, useState} from "react";
import BoardReducer from "../reducers/BoardReducer";
import Board from "../components/Board";
import _ from "lodash";

export const MyContext = React.createContext();

const BoardView = () => {
  const [columns, dispatch] = useReducer(BoardReducer, {});
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
        <Board/>
      </MyContext.Provider>
    </>
  );
}

export default BoardView;
