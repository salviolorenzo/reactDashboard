import React from 'react';

function Todolist(props) {
  return (
    <ul className='todo-list'>
      {props.items.map((item, index) => {
        return (
          <li key={index} onClick={() => {}}>
            {item.content}
          </li>
        );
      })}
    </ul>
  );
}

export default Todolist;
