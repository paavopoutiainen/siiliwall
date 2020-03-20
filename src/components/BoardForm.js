import React, { useState } from "react";

const BoardForm = () => {
    const blankBoard = { name: "" }
    const [boardList, setBoardList] = useState([{ ...blankBoard }]);

    const handleChange = e => {
        const updateBoard = [...boardList];
        updateBoard[e.target.dataset.idx][e.target.className] = e.target.value;
        setBoardList(updateBoard);
        console.log(boardList)
    }

    const addBoard = () => {
        setBoardList([...boardList, { ...blankBoard }]);
    }

    return (<form>
        <input type="button" value="Add new board" onClick={addBoard} />
        {
            boardList.map((data, idx) => {
                const boardId = `name-${idx}`;
                return (
                    <div key={`board-${idx}`}>
                        <input
                            type="text"
                            name={boardId}
                            data-idx={idx}
                            id={boardId}
                            className="name"
                            value={boardList[idx].name}
                            onChange={handleChange}
                        />
                    </div>
                );
            })
        }
        <input type="submit" value="Submit" />
        <div>
            {boardList.map(board => (
                <div key={board.id}>
                    <div>{`Board: ${board.name}`}</div>
                </div>
            ))}
        </div>
    </form>
    )
}

export default BoardForm;