import React from 'react';

function Info(props) {
  return (
    <div className='weather-info'>
      <ul className='weather-list'>
        <li>{props.temp}</li>
        <li>{props.humidity}</li>
        <li>{props.wind}</li>
      </ul>
    </div>
  );
}

export default Info;
