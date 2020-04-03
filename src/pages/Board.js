import React, { useEffect, useReducer, useState } from "react";
import Cardreducer from "./BoardReducer";
import DnDContext from "../components/DragDropContext";

export const MyContext = React.createContext();

const App = () => {
  const [columns, dispatch] = useReducer(Cardreducer, {});
  useEffect(() => {
    const url = "https://siiliwall.herokuapp.com/columns";
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        const tiko = Object.assign({}, responseJson);
      })
      .catch(error => {});
  }, []);

  return (
    <>
      <MyContext.Provider value={{ columns, dispatch }}>
        <DnDContext></DnDContext>
      </MyContext.Provider>
  </> 
  );
}

export default App;
