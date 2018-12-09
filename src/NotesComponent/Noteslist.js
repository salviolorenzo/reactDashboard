import React from 'react';

function Noteslist(props) {
  return (
    <ul className='note-list'>
      {props.items.map(item => {
        return (
          <li
            key={item.id}
            onClick={() => {
              props.onClick(item);
            }}
          >
            {item.title}
          </li>
        );
      })}
      <li onClick={props.handleNewNote}>New note</li>
    </ul>
  );
}

export default Noteslist;