import React, { useEffect, useReducer, useState} from "react";
import Cardreducer from "./BoardReducer";
import DnDContext from "../components/DragDropContext";

export const MyContext = React.createContext();

const Board = () => {
  const [columns, dispatch] = useReducer(Cardreducer, {});
  const [boardVal, setBoardVadl] = useState();
  useEffect(() => {
    const url = "http://siiliwall.herokuapp.com/boards";
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        const result = responseJson.find(({ boardId }) => boardId);
        const boardValue = result.boardId;
        setBoardVadl(boardValue);
        const columnObject = Object.assign({}, result.columns);
        dispatch({ type: "GET_DATA", columnObject: columnObject, result });
      })
      .catch(error => {});
  }, []);

  return (
    <>
      <MyContext.Provider value={{ columns, dispatch, boardVal }}>
        <DnDContext></DnDContext>
      </MyContext.Provider>
    </>
  );
}

export default Board;
