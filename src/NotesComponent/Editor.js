import React from 'react';

function Editor(props) {
  return (
    <div className='editor'>
      <h3>{props.content.title}</h3>
      <textarea
        value={props.content.content}
        onChange={event => {
          props.onChange(props.content, event);
        }}
        rows='3'
      />
    </div>
  );
}

export default Editor;
