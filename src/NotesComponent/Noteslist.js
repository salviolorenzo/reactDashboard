import React from 'react';

function Noteslist(props) {
  return (
    <ul className='note-list'>
      {props.items.map(item => {
        return (
          <li
            onClick={() => {
              props.onClick(item);
            }}
          >
            {item.title}
          </li>
        );
      })}
    </ul>
  );
}

export default Noteslist;
