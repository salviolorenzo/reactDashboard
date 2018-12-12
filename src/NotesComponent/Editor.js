import React from 'react';

function Editor(props) {
  return (
    <div className='editor'>
      <form
        onSubmit={event => {
          props.handleSubmit(props.content, event);
        }}
      >
        <input
          placeholder={props.content.title}
          type='text'
          onChange={event => {
            props.handleTitle(props.content, event);
          }}
          name='title'
        />
        <textarea
          value={props.content.content}
          onChange={event => {
            props.onChange(props.content, event);
          }}
          rows='3'
          name='editor'
        />
        <input type='submit' value='Save' />
      </form>
    </div>
  );
}

export default Editor;
