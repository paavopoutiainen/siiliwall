import React, { useState } from "react";

const BoardForm = () => {
    const blankBoard = { name: "" }
    const [boardList, setBoardList] = useState([{ ...blankBoard }]);
    const handleChange = e => {
        const updateBoard = [...boardList];
        updateBoard[e.target.dataset.idx][e.target.className] = e.target.value;
        setBoardList(updateBoard);
    }
    const addBoard = () => {
        setBoardList([...boardList, { ...blankBoard }]);
    }
    const boardItems = boardList.map((board, index) =>
    <li key={index}>
        {board.name}
    </li>
    );

    return (<form>
        <input type="button" value="Add new board" onClick={addBoard} />
        {
            boardList.map((data, idx) => {
                const boardId = `name-${idx}`;
                return (
                    <div key={idx}>
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
        <ul>
            {boardItems}
        </ul>
    </form>
    )
}

export default BoardForm;