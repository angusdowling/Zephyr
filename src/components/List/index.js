import React from 'react';

const List = props => (
  <ul>
  {
    props.items.map((post, index) => <li key={index}>{post.title.rendered}</li>)
  }
  </ul>
);

export default List;