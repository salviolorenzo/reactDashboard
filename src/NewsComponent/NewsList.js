import React from 'react';
import News from './News';

function NewsList(props) {
  return (
    <ul className='news-list'>
      {props.items.map((item, index) => {
        return (
          <li key={index}>
            <h4>
              <a href={item.url} target='_blank' rel='noopener noreferrer'>
                {item.title}
              </a>
            </h4>
          </li>
        );
      })}
    </ul>
  );
}

export default NewsList;
