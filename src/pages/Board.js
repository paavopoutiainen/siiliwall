import React, { useEffect, useReducer, useState} from "react";
import Cardreducer from "./BoardReducer";
import DnDContext from "../components/DragDropContext";

export const MyContext = React.createContext();

const App = () => {
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
        const tiko = Object.assign({}, result.columns);
        dispatch({ type: "GET_DATA", tiko, result });
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

export default App;
