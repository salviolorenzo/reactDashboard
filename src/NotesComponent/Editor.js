import React from 'react';

function Editor(props) {
  return (
    <div className='editor'>
      <h3>{props.content.title}</h3>
      <textarea
        value={props.content.content}
        onChange={() => {
          props.onChange(props.content);
        }}
      />
    </div>
  );
}

export default Editor;
