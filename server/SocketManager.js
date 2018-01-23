const io = require('./index.js').io;
const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, LETTER_UPDATE, WORD_CHALLENGED, PLAYER_UNSUCCESSFUL, PLAYER_SUCCESSFUL, YOUR_TURN, SEND_MODAL, NEW_ROOM, START } = require('../src/Events');
const MAX_WAITING = 5000;

const sessions = [];

class SessionObject {
	constructor() {
		this.connectedUsers = [],
		this.current_turn = 0,
		this.timeOut = null,
		this.turn = 0,
		this.text = [],
		this.room = randomString()	
	}

	addUser(n, id) {
		var tempUser = {
			name: n,
			id: id,
			score: 10
		}
		this.connectedUsers.push(tempUser);
	}
}


// for(var i=0; i< 4; i++) {
// 	let tempRoom = new SessionObject();
// 	if(i === 2) myPhrase = tempRoom.room;
// 	sessions.push(tempRoom);
// }
// console.log(sessions);

// console.log(sessionSearch(myPhrase));


module.exports = function(socket){

	socket.on(NEW_ROOM, (id, user, callback) => {
		let newRoom = new SessionObject();
		newRoom.addUser(user, id);
		sessions.push(newRoom);
		callback(sessions, newRoom.room, newRoom.connectedUsers);
	});

	//Verify Username
	socket.on(VERIFY_USER, (data, callback)=>{
		// if(isUser(connectedUsers, nickname)){
		// 	callback({ isUser:true, user:null })
		// }else{
		// 	callback({ isUser:false, user:{ id:socket.id,
		// name: nickname}
	 //      })
	 //   } 
		console.log(data);
		callback(data);
	});

	// JOINING SESSION
	socket.on(USER_CONNECTED, (user_name, user_id, room_id, callback)=>{
		var index = sessionSearch(room_id);
		if(index !== undefined ) {
			sessions[index].addUser(user_name, user_id);
			callback(sessions[index].room, sessions[index].connectedUsers);
			io.emit(USER_CONNECTED, sessions[index].room, sessions[index].connectedUsers)
		} else {
			callback(['not found']);
		}
	});

	
	//User disconnects
	socket.on('disconnect', ()=>{

		// for (var i = 0; i < connectedUsers.length; i ++ ) {
		// 	if (connectedUsers[i].id === socket.id) {
		// 		console.log('found user disconnected: ' + connectedUsers[i].id);

		// 		const id = connectedUsers[i].id;

		// 		connectedUsers = connectedUsers.filter((user) => user.id !== id);

		// 	io.emit(USER_DISCONNECTED, connectedUsers);
		// 	console.log("Disconnect", connectedUsers);
		// }
	  // }	
	});

	

	socket.on(START, (room_id, callback) => {
		console.log(room_id);
		var index = sessionSearch(room_id);
		io.emit('START', sessions[index].room, sessions[index].connectedUsers);
		callback(room_id);
		next_turn(room_id);
	});

	// socket.on('pass_turn', (room, player) => {
	// 	const index = sessionSearch(room);
	// 	activePlayer = sessions[index].connectedUsers[sessions[index]._turn];
	// 	console.log('users turn: ', activePlayer);
	// 	if (activePlayer) {
	// 		resetTimout(room);
	// 		next_turn(room);
			
	// 	}
	// });
	
	//Letter is passed through and added to array
	socket.on(LETTER_UPDATE, (data, room, player)=> {
		const index = sessionSearch(room);
		const text = sessions[index].text
			text.push(data);
			io.emit('LETTER_UPDATE', text);
			console.log(text);

			activePlayer = sessions[index].connectedUsers[sessions[index].turn].name;
			console.log('users ln 120: ', sessions[index].connectedUsers[sessions[index].turn]);
			console.log('users turn: ', activePlayer);
		
		// if (activePlayer) {
			resetTimout(room);
			next_turn(room);
		
	});

	// socket.on(PLAYER_SUCCESSFUL, () => {
	// 	console.log('player_successful');
	// 	let _turn = current_turn-- % connectedUsers.length;
	// 	console.log('lost points ' + connectedUsers[_turn].id);
	// 	io.emit('lost_points', connectedUsers[_turn].id);
	// 	clearTimeout(timeOut);
	// 	text.length = 0
	// })

	// socket.on(PLAYER_UNSUCCESSFUL, () => {
	// 	console.log('player_unsuccessful');
	// 	let _turn = current_turn % connectedUsers.length;
	// 	console.log('lost_points ' + connectedUsers[_turn].id);
	// 	io.emit('lost_points', connectedUsers[_turn].id);
	// 	clearTimeout(timeOut);
	// 	text.length = 0

	// })

	// socket.on(WORD_CHALLENGED, (data) => {
		
	// 	io.emit('WORD_CHALLENGED', data);
	// })

	// socket.on(SEND_MODAL, () => {
	// 	let _turn = current_turn-- % connectedUsers.length;
	// 	console.log('modal sent to ' + connectedUsers[_turn].id);
	// 	io.emit('SEND_MODAL', connectedUsers[_turn].id);
	// 	clearTimeout(timeOut);
	// 	text.length = 0;
	// })

	// //User logsout
	// socket.on(LOGOUT, ()=>{
	// 	connectedUsers = connectedUsers.splice(0,1);
	// 	io.emit(USER_DISCONNECTED, connectedUsers)
	// 	console.log("Disconnect", connectedUsers);

	// });
}

// Game Functionality
function next_turn(room){
	var index = sessionSearch(room);
	let turn = sessions[index].turn;
	turn = sessions[index].current_turn++ % sessions[index].connectedUsers.length;
	console.log('turn ln 174: ' + sessions[index].turn);
	console.log( sessions[index].connectedUsers[turn].name + "'s turn");
	io.emit(YOUR_TURN, sessions[index].connectedUsers[turn].id);
	triggerTimout(index);
}

function triggerTimout(index) {

	sessions[index].timeOut = setTimeout(()=>{
		next_turn(sessions[index].room);
	}, MAX_WAITING);
}

function resetTimout(room){
	const index = sessionSearch(room);
	if(typeof sessions[index].timeOut === 'object'){
		console.log("timemout reset");
		clearTimeout(sessions[index].timeOut);
	}
}

// Check to see if username is not already taken
function isUser(userList, username){
  	return username in userList
}

function randomString() {
	const bank = "abcdefghijklmnopqrstuvwxyz123456890";
	var phrase = '';
	for(var i=0; i<6; i++) {
		let rando = Math.floor((Math.random() * bank.length ));
		phrase += bank.charAt(rando);
	}
	return phrase;
}

function sessionSearch(str) {
	var data = sessions;
	for(var i =0; i< data.length; i++) {
		if(data[i].room === str) {
			return i;
		}
	}
}