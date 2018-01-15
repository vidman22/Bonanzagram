const uuidv4 = require('uuid/v4')

/*
*	createUser
*	Creates a user.
*	@prop id {string}
*	@prop name {string}
*	@param {object} 
*		name {string}
*/
const createUser = ({name = ""} = {})=>(
	{
		id:uuidv4(),
		name
		
	}
)


module.exports = {
	createUser
}