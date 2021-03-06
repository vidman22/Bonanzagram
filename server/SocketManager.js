const io = require('./index.js');

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, LETTER_UPDATE, WORD_CHALLENGED, PLAYER_UNSUCCESSFUL, PLAYER_SUCCESSFUL, YOUR_TURN, SEND_MODAL, NEW_ROOM, START } = require('../src/Events');
const MAX_WAITING = 15000;
const db = require('./models')

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

	next_turn(){

		this.turn = this.current_turn++ % this.connectedUsers.length;
		// console.log( this.connectedUsers[this.turn].name + "'s turn");
		io.emit(YOUR_TURN, this.connectedUsers[this.turn].id);
		this.triggerTimeout(this.turn);
	}

	triggerTimeout(turn) {
	
		this.timeOut = setTimeout(()=>{
		this.currentPlayerLoss(turn);
	   }, MAX_WAITING);
   }

   resetTimeout(){
	if(typeof this.timeOut === 'object'){
		console.log("timemout reset");
		clearTimeout(this.timeOut);
	}
   }

    currentPlayerLoss(turn) {
    	let points; 
		if (this.connectedUsers[turn]) {
			const player = this.connectedUsers[turn];
			if (this.text.length <= 0 ) {
				points = 1 
			} else {
				 points = this.text.length;
			}

				
				
				
				setTimeout(io.emit('lost_points', this.connectedUsers[turn].id, this.connectedUsers, this.room, points), 6000);
				clearTimeout(this.timeOut);
				this.text = [];
				this.next_turn();
		} else clearTimeout(this.timeOut);
	}

	prevPlayerLoss(room) {
		let points
		let current_turn = this.current_turn;
		let turn = (current_turn-2) % this.connectedUsers.length;
		const player = this.connectedUsers[turn];
		if (this.text.length <= 0 ) {
			 points = 1 
		} else {
			 points = this.text.length;
		}
			
			
			setTimeout(io.emit('lost_points', this.connectedUsers[turn].id, this.connectedUsers, this.room, points), 6000);
			clearTimeout(this.timeOut);
			this.text= [];
			this.next_turn();
		}

	}



module.exports = function(socket){

	socket.on(NEW_ROOM, (id, user, callback) => {
		let newRoom = new SessionObject();
		newRoom.addUser(user, id);
		sessions.push(newRoom);
		callback(sessions, newRoom.room, newRoom.connectedUsers);
		// db.Word.find({"word": 'apple'},(err, data) => {
		// 	if(err) console.log(err);
		
			
		// })
		
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
		console.log('disconnect occured' + socket.id);
		for (var i = 0; i < sessions.length; i ++ ) {
			for ( var j = 0; j < sessions[i].connectedUsers.length; j++) {
				if (sessions[i].connectedUsers[j].id === socket.id) {
					if (sessions[i].connectedUsers.length === 1) {
						clearTimeout(sessions[i].timeOut);
						// 	
					}
					// console.log('found user disconnected: ' + sessions[i].connectedUsers[j].id);

					const id = sessions[i].connectedUsers[j].id;

					sessions[i].connectedUsers = sessions[i].connectedUsers.filter((user) => user.id !== id);

			io.emit(USER_DISCONNECTED, sessions[i].connectedUsers , sessions[i].room );
			console.log("After disconnect", sessions[i].connectedUsers);
		}
	  }	
	 }
	});

	socket.on(USER_DISCONNECTED, (player_id)=>{
		console.log('disconnect occured' + player_id);
		for (var i = 0; i < sessions.length; i ++ ) {
			for ( var j = 0; j < sessions[i].connectedUsers.length; j++) {
				if (sessions[i].connectedUsers[j].id === player_id) {
					if (sessions[i].connectedUsers.length === 1) {
						clearTimeout(sessions[i].timeOut);
						io.emit('winner', sessions[i].connectedUser[0].id)
					} 
					// console.log('found user disconnected: ' + sessions[i].connectedUsers[j].id);

					const id = sessions[i].connectedUsers[j].id;

					sessions[i].connectedUsers = sessions[i].connectedUsers.filter((user) => user.id !== id);

			io.emit('USER_DISCONNECTED', sessions[i].connectedUsers , sessions[i].room );
			console.log("After disconnect", sessions[i].connectedUsers);
		}
	  }	
	 }
	});


	

	socket.on(START, (room_id, callback) => {
		console.log(room_id);
		var index = sessionSearch(room_id);
		io.emit('START', sessions[index].room, sessions[index].connectedUsers);
		callback(room_id);
		sessions[index].next_turn();
	});

	
	//Letter is passed through and added to array
	socket.on(LETTER_UPDATE, (data, room )=> {
		const index = sessionSearch(room);
		const text = sessions[index].text
	
			text.push(data);
			io.emit('LETTER_UPDATE', text, room);
		
		
			sessions[index].resetTimeout();
			sessions[index].next_turn();
		
	});

	socket.on(SEND_MODAL, (room) => {
		const index = sessionSearch(room);
		console.log(sessions[index].current_turn);
		let challengedPlayerIndex = (sessions[index].current_turn-2) % sessions[index].connectedUsers.length;
		let challengedPlayer = sessions[index].connectedUsers[challengedPlayerIndex];
			console.log('modal sent to ' + challengedPlayer.name);
			io.emit('SEND_MODAL', challengedPlayer.id);
			clearTimeout(sessions[index].timeOut);

	});

	socket.on(WORD_CHALLENGED, (word, room, type) => {

		var index = sessionSearch(room);
		
		db.Word.find({"word": word}).then(data => {			
				
				console.log('challenged word: ' + word + ' result ' + data );
				if (data.length && type=== 'spell')  {
					console.log("current player loses points");
					io.emit('word_spelled', data[0].word, room );
					sessions[index].currentPlayerLoss(sessions[index].turn);

					
				} if (!data.length && type === 'completed') {
					console.log("current player loses points");
					io.emit('wrong_word', word, room);
					sessions[index].currentPlayerLoss(sessions[index].turn);

				} if (data.length && type=== 'completed') {
					clearTimeout(sessions[index].timeOut);
					io.emit('word_spelled', data[0].word, room );
					console.log("prev player loses points");
					sessions[index].prevPlayerLoss();

				} if (!data.length && type=== 'spell'){
					console.log("prev player loses points");
					io.emit('wrong_word', word, room);
					sessions[index].prevPlayerLoss();
					
				} else {
					console.log("ln 208 error");
				}

		  }).catch(err => console.log(err)) 

		
	});

	
	// //User logsout
	// socket.on(LOGOUT, ()=>{
	// 	connectedUsers = connectedUsers.splice(0,1);
	// 	io.emit(USER_DISCONNECTED, connectedUsers)
	// 	console.log("Disconnect", connectedUsers);

	// });
}


// Database query ============================================================================
function checkWord(word){
	db.Word.find({"word": word}, (err, data) => {
		if(err) return console.log(err);
		console.log("function check data", data);
		return data.word 

	})
}

// Game Functionality ========================================================================



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