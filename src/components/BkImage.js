import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BkImage = () => {
	return (
		<Container fluid>
			<Row>
				<Col>
					<div className='bk-img imgFluid'>
						{/* <h1 align='center'>Some header example</h1> */}
						<div className='dashboard-header'>
							<div className='dashboard-header-title'>
								<h1 className='header-text'>Saicophonic Medicine</h1>
							</div>
							<h5 className='header-subtext'>An expanding library of live music sessions</h5>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default BkImage;
