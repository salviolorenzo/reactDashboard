import React from 'react';

function Todolist(props) {
  return (
    <ul className='todo-list'>
      {props.items.map(item => {
        return (
          <li
            key={item.id}
            onClick={() => {
              props.handleDelete(item);
            }}
          >
            {item.content}
          </li>
        );
      })}
    </ul>
  );
}

export default Todolist;
