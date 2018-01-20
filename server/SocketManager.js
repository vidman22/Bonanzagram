const io = require('./index.js').io;

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, LETTER_UPDATE, WORD_CHALLENGED, PLAYER_UNSUCCESSFUL, PLAYER_SUCCESSFUL, YOUR_TURN, SEND_MODAL  } = require('../src/Events');

let connectedUsers = [];
let current_turn = 0;
let timeOut;
let _turn = 0;
const MAX_WAITING = 5000;

let text = [];



module.exports = function(socket){

	//Verify Username
	socket.on(VERIFY_USER, (nickname, callback)=>{
		if(isUser(connectedUsers, nickname)){
			callback({ isUser:true, user:null })
		}else{
			callback({ isUser:false, user:{ id:socket.id,
		name: nickname}
	      })
	   }
	});

	//User Connects with username
	socket.on(USER_CONNECTED, (user)=>{
		connectedUsers.push(user);

		io.emit(USER_CONNECTED, connectedUsers)
		console.log("connectedUsers", connectedUsers);

	});
	
	//User disconnects
	socket.on('disconnect', ()=>{

		for (var i = 0; i < connectedUsers.length; i ++ ) {
			if (connectedUsers[i].id === socket.id) {
				console.log('found user disconnected: ' + connectedUsers[i].id);

				const id = connectedUsers[i].id;

				connectedUsers = connectedUsers.filter((user) => user.id !== id);

			io.emit(USER_DISCONNECTED, connectedUsers);
			console.log("Disconnect", connectedUsers);
		}
	  }	
	});

	socket.on('pass_turn', () => {
		console.log('users turn: ', connectedUsers[_turn]);
		if (connectedUsers[_turn].id) {
			resetTimout();
			next_turn();
			
		}
	});

	socket.on('start', () => {
		next_turn();
	})
	// Letter is passed through and added to array
	socket.on(LETTER_UPDATE, (data)=> {
		text.push(data);
		io.emit('LETTER_UPDATE', text);
		console.log(text);
	});

	socket.on(PLAYER_SUCCESSFUL, () => {
		console.log('player_successful');
		let _turn = current_turn-- % connectedUsers.length;
		console.log('lost points ' + connectedUsers[_turn].id);
		io.emit('lost_points', connectedUsers[_turn].id);
		clearTimeout(timeOut);
		text.length = 0
	})

	socket.on(PLAYER_UNSUCCESSFUL, () => {
		console.log('player_unsuccessful');
		let _turn = current_turn % connectedUsers.length;
		console.log('lost_points ' + connectedUsers[_turn].id);
		io.emit('lost_points', connectedUsers[_turn].id);
		clearTimeout(timeOut);
		text.length = 0

	})

	socket.on(WORD_CHALLENGED, (data) => {
		
		io.emit('WORD_CHALLENGED', data);
	})

	socket.on(SEND_MODAL, () => {
		let _turn = current_turn-- % connectedUsers.length;
		console.log('modal sent to ' + connectedUsers[_turn].id);
		io.emit('SEND_MODAL', connectedUsers[_turn].id);
		clearTimeout(timeOut);
		text.length = 0;
	})

	//User logsout
	socket.on(LOGOUT, ()=>{
		connectedUsers = connectedUsers.splice(0,1);
		io.emit(USER_DISCONNECTED, connectedUsers)
		console.log("Disconnect", connectedUsers);

	});
}

// Game Functionality
function next_turn(){
	_turn = current_turn++ % connectedUsers.length;
	console.log('turn: ' + _turn);
	console.log('line 89: ' + connectedUsers[_turn].id);
	io.emit(YOUR_TURN, connectedUsers[_turn].id);
	console.log("next turn triggered ", _turn);
	triggerTimout();
}

function triggerTimout() {
	timeOut = setTimeout(()=>{
		next_turn();
	}, MAX_WAITING);
}

function resetTimout(){
	if(typeof timeOut === 'object'){
		console.log("timemout reset");
		clearTimeout(timeOut);
	}
}

// Check to see if username is not already taken
function isUser(userList, username){
  	return username in userList
}