import React from 'react';

function Stats(props) {
  return (
    <>
      <h4>{props.items.username}</h4>
      <ul className='stat-list'>
        <li>
          <a href={props.items.reposUrl}>{props.items.repos}</a>
          <span>Repositories</span>
        </li>
        <li>
          <a href={props.items.followersUrl}>{props.items.followers}</a>
          <span>Followers</span>
        </li>
        <li>
          <a href={props.items.followingUrl}>{props.items.following}</a>
          <span>Following</span>
        </li>
      </ul>
    </>
  );
}

export default Stats;
