const io = require('./index.js').io;

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, LETTER_UPDATE  } = require('../src/Events');

// const { createUser } = require('../Factories');

let connectedUsers = [];

let text = [];

module.exports = function(socket){
					
	// console.log('\x1bc'); //clears console
	// console.log('socket: ', socket);

	//Verify Username
	socket.on(VERIFY_USER, (nickname, callback)=>{
		if(isUser(connectedUsers, nickname)){
			callback({ isUser:true, user:null })
		}else{
			callback({ isUser:false, user:{ id:socket.id,
		name: nickname}
	      })
	   }
	})

	//User Connects with username
	socket.on(USER_CONNECTED, (user)=>{
		connectedUsers.push(user);
		// socket.user = user

		io.emit(USER_CONNECTED, connectedUsers)
		console.log("connectedUsers", connectedUsers);

	})
	
	//User disconnects
	socket.on('disconnect', ()=>{
		console.log('disconnected user: ' + socket.id);
		for (var i = 0; i < connectedUsers.length; i ++ ) {
			if (connectedUsers[i].id === socket.id) {
				console.log('found user disconnected: ' + connectedUsers[i].id);

				const id = connectedUsers[i].id;

				connectedUsers = connectedUsers.filter((user) => user.id !== id);

			io.emit(USER_DISCONNECTED, connectedUsers);
			console.log("Disconnect", connectedUsers);
		}
	  }	
	})

	socket.on(LETTER_UPDATE, (data)=> {
		text.push(data);
		io.emit('LETTER_UPDATE', text);
		console.log(text);
	})

	//User logsout
	socket.on(LOGOUT, ()=>{
		connectedUsers = connectedUsers.splice(0,1);
		io.emit(USER_DISCONNECTED, connectedUsers)
		console.log("Disconnect", connectedUsers);

	})
}


/*
* Adds user to list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to added to the list.
* @return userList {Object} Object with key value pairs of Users
*/
function addUser(user){
	
	// newList = user
	// return newList
}

/*
* Removes user from the list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {string} name of user to be removed
* @return userList {Object} Object with key value pairs of Users
*/
function removeUser(){

}

/*
* Checks if the user is in list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {String}
* @return userList {Object} Object with key value pairs of Users
*/
function isUser(userList, username){
  	return username in userList
}