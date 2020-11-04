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


{/* <div style={{width: '300px'}}> */}
<Popup trigger={<button>Edit</button>} position="right center" className='my-popup'>
<div style={{ width: '250px'}}>
<Form onSubmit={this.handleSubmit} style={{width: '250px', height: '400px'}}>
<label name='username'>Username</label>
<input onChange={this.handleChange} type="text" name="username" value={this.state.username}></input>
<label>Email</label>
<input onChange={this.handleChange} type="text" name="email" value={this.state.email}></input>
<label>Bio</label>
<TextArea style={{height: '200px'}} onChange={this.handleChange} name="bio" value={this.state.bio}/>
<Button type='submit'>Signup</Button>
</Form>
</div>
</Popup>
{/* </div> */}