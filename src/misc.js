// import React from 'react';
// class Search extends  React.Component {

// 	state = {
// 			query: '',
//       results: {},
//       loading: false,
//       message: '',
//     };

//   handleOnInputChange = (event) => {
//     const query = event.target.value;
//       this.setState({ query, loading: true, message: ''  } );
//   };

//   renderSearchResults = () => {
//     const {results} = this.state;
//     if (Object.keys(results).length && results.length) {
//       return (
//         <div className="results-container">
//           {results.map((result) => {
//             return (
//               <a key={result.id} href={result.previewURL} className="result-items">
//                 <h6 className="image-username">{result.user}</h6>
//                 <div className="image-wrapper">
//                   <img className="image" src={result.previewURL} alt={result.user}/>
//                 </div>
//               </a>
//             );
//           })}
//         </div>
//       );
//     }
//   };
    
// 	render() {
// 		return (
// 			<div className="container">
// 				{/*Heading*/}
// 				<h2 className="heading">Live Search: React Application</h2>
// 				{/*Search Input*/}
// 				<label className="search-label" htmlFor="search-input">
//         <input
//           type="text"
//           value=""
//           id="search-input"
//           placeholder="Search..."
//           onChange={this.handleOnInputChange}
//         />
// 					<i className="fa fa-search search-icon"/>
// 				</label>
				
// 			</div>
// 			)
// 	}
// }
// export default Search;