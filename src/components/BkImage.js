import React from 'react';
import Container from 'react-bootstrap/Container';

const BkImage = () => {
	return (
		<Container fluid className='text-center '>
			<div className='bk-img imgFluid d-flex align-content-center flex-wrap'>
				{/* m-md-auto  works on most, except regular ipad in portrait */}
				<div className='dashboard-header d-flex  align-self-center m-md-auto animated animatedFadeInUp fadeInUp'>
					<h1 className='header-text '>Saicophonic Medicine</h1>
				</div>
			</div>
		</Container>
	);
};

export default BkImage;
