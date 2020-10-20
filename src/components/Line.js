import React from 'react';

const Line = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 2,
      }}
  />
);

export default Line

