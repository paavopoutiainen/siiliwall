import uuid from "uuid/v4";

const Cardreducer = (columns, action) => {
    switch (action.type) {
      case "GET_DATA":
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
              items: sourceItems
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destItems
            }
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
        const id = action.item;
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
        return {
          ...columns,
          ...delete columns[action.id]
        };
  
      default:
        return columns;
    }
  };

  export default Cardreducer;