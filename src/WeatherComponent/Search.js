import React from 'react';

function Search(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <input
        placeholder='Type a city name'
        type='text'
        value={props.term}
        onChange={props.handleChange}
      />
      <input type='submit' value='Search' />
    </form>
  );
}

export default Search;
