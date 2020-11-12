import React from 'react';

const Line = ({ color, height = 3 }) => (
  <hr
      style={{
          // color: color,
          backgroundColor: color,
          height: height,
          border: 0
      }}
  />
);

export default Line

