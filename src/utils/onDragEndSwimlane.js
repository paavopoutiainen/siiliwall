export const onDragEndSwimlane = async (result, moveSwimlane) => {
    const { destination, source, draggableId } = result
    if (!destination) return

    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    /*if (result.type === 'swimlane') {
        const newSwimlaneOrder = 
    }*/
}