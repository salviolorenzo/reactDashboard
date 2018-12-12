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
      <li
        key={'new'}
        onClick={item => {
          props.handleNewNote(item);
        }}
      >
        New note
      </li>
    </ul>
  );
}

export default Noteslist;
