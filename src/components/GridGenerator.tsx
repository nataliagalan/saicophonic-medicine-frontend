import chunk from 'lodash/chunk';

import * as React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// const chunk = require('lodash/chunk')

type GridGeneratorProps = {
	cols: number;
};
const GridGenerator: React.FC<GridGeneratorProps> = ({ cols: number, children }) => {
	const colWidth = 12 / 4;
  const rows = chunk(React.Children.toArray(children), 4);
	return (
		<>
			{rows.map((cols: any, idx: number) => (
				<Row key={idx} className='dashboard-row'>
					{cols.map((col: any, idx: number) => (
						// change to sm and md to show grid on regular ipad
						// <Col sm={12} md={colWidth} key={idx}>
						<Col md={12} lg={3} key={idx}>
							{col}
						</Col>
					))}
				</Row>
			))}
		</>
	);
};

export default GridGenerator;