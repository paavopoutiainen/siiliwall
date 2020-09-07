import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

//TODO: rename remaining cards after graphql takeover

const Column = ({ id, column }) => {
  
  return (
    <div>
      <Droppable droppableId={id} key={id}>
        {(provided, snapshot) => {
          return (
            <Task id={id} column={column} provided={provided} snapshot={snapshot}/>
          );
        }}
      </Droppable>
    </div>
  );
};

export default Column;
