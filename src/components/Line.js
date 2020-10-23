import React from 'react';

const Line = ({ color }) => (
  <hr
      style={{
          // color: color,
          backgroundColor: color,
          height: 3,
          border: 0
      }}
  />
);

export default Line

