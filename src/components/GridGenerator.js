
import { chunk } from 'lodash'
import * as React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

type GridGeneratorProps = {
  cols: 1 | 2 | 3 | 4 | 6 | 12
}

const GridGenerator: React.FC<GridGeneratorProps> = ({ cols, children }) => {
const colWidth = 12 / cols
const rows = chunk(React.Children.toArray(children), cols)
return (
    <>
      {rows.map((cols, idx) => (
        <Row key={idx} className="dashboard-row">
          {cols.map((col, idx) => (
            // change to sm and md to show grid on regular ipad
            // <Col sm={12} md={colWidth} key={idx}>
            <Col md={12} lg={colWidth} key={idx}>
              {col}
            </Col>
          ))}
        </Row>
      ))}
    </>
  )
}
export default GridGenerator