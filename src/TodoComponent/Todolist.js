import React from 'react';

function Todolist(props) {
  return (
    <ul className='todo-list'>
      {props.items.map(item => {
        return (
          <li
            key={item.id}
            onClick={event => {
              props.handleDelete(item, event);
            }}
            style={props.style}
          >
            {item.content}
            <div className='checkbox'>
              <p />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Todolist;
