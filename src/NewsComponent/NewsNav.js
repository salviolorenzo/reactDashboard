import React from 'react';

const categories = [
  'Business',
  'Entertainment',
  'General',
  'Health',
  'Science',
  'Sports',
  'Technology'
];

function NewsNav(props) {
  return (
    <>
      <ul className='news-nav'>
        {categories.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                props.handleClick(item);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>

      <ul className={`mobileNewsNav ${props.className}`}>
        {categories.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                props.handleClick(item);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default NewsNav;
