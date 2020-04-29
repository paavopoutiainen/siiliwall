const Cardreducer = (columns, action) => {
  switch (action.type) {
    case "GET_DATA":
      const { boardId } = action.result;
      return {
        ...action.columnObject,
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
        fetch(
          `https://siiliwall.herokuapp.com/${sourceColumn.columnId}/removecard/${removed.id}/moveto/${destColumn.columnId}/${destination.index}`
        )
          .then((response) => response.text())
          .then((data) => {})
          .catch((error) => {});
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
        const { source, destination } = action.result;
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        fetch(
          `https://siiliwall.herokuapp.com/${sourceColumn.columnId}/removecard/${removed.id}/moveto/${destColumn.columnId}/${destination.index}`
        )
          .then((response) => response.text())
          .then((data) => {})
          .catch((error) => {});
        return {
          ...columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems,
          },
        };
      }
    case "NEW_COL_NAME":
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
        .then((data) => (data))
        .catch((error) => (error));
      return {
        ...columns,
        [action.id]: {  
          name: action.name,
          key: action.dest.key,
          columnId: action.dest.columnId,
          columnLimit: action.dest.columnLimit,
          items: action.items, 
        },
      };
    case "ADD_NEW_COL":
      const colId = Date.now();
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
        `https://siiliwall.herokuapp.com/boardss/${action.boardContext.boardVal}/columns`,
        requestOptions
      )
        .then((response) => response.text())
        .then((data) => (data))
        .catch((error) => (error));
        const columnList = Object.assign([], columns);
        columnList.push({
          key: action.tiko.boardVal,
          columnId: colId,
          name: "New column",
          items: [],
        });
        const finalColumns = Object.assign({}, columnList);
        return {
          ...finalColumns,
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
      const targetList = Object.assign([], columns);
      targetList.splice(action.id, 1);
      const final = Object.assign({}, targetList);
      return {
        ...final,
      };
    default:
      return columns;
  }
};

export default Cardreducer;
