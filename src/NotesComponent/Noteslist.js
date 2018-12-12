import React from 'react';

function Noteslist(props) {
  return (
    <ul className='note-list'>
      {props.items.map((item, index) => {
        return (
          <li
            key={index}
            onClick={() => {
              props.onClick(item);
            }}
          >
            {item.title}
            <div
              onClick={() => {
                props.handleDelete(item);
              }}
            >
              X
            </div>
          </li>
        );
      })}
      <li onClick={props.handleNewNote}>New note</li>
    </ul>
  );
}

export default Noteslist;
