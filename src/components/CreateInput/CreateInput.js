import React from 'react';

const Input = (props) => (

    <form onSubmit={props.submit} className="login-form" >
		<label htmlFor="nickname">
			<h2>Add a Name</h2>
		</label>
		<input
			ref={(input) => {this.textInput = input}}
			type="text"
			id="nickname"
			value={props.nickname}
			onChange={props.handleChange}
			placeholder={'Name'}
		/>
	{/* <div className="error">{error ? error:null}</div> */}
		
	</form>
)
export default Input;

