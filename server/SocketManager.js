const io = require('./index.js').io;

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, LETTER_UPDATE, WORD_CHALLENGED, PLAYER_UNSUCCESSFUL, PLAYER_SUCCESSFUL, YOUR_TURN, SEND_MODAL, NEW_ROOM, START } = require('../src/Events');
const MAX_WAITING = 5000;
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
		console.log( this.connectedUsers[this.turn].name + "'s turn");
		io.emit(YOUR_TURN, this.connectedUsers[this.turn].id);
		this.triggerTimout();
	}

	triggerTimout() {
	
	this.timeOut = setTimeout(()=>{
		this.currentPlayerLoss();
	}, MAX_WAITING);
   }

   resetTimout(){
	if(typeof this.timeOut === 'object'){
		console.log("timemout reset");
		clearTimeout(this.timeOut);
	}
   }

    currentPlayerLoss(room) {
		
		let turn = (this.current_turn--) % this.connectedUsers.length;
		const player = this.connectedUsers[turn];
		let points = this.text.length;

			this.connectedUsers[turn].score - points;

			console.log(player.name + ' has ' + this.connectedUsers[turn].score + ' points' );
				
			io.emit('lost_points', this.connectedUsers, room);
			clearTimeout(this.timeOut);
			this.text = '';
			this.next_turn();
	}

	prevPlayerLoss(room) {
		
		let turn = (this.current_turn-2) % this.connectedUsers.length;
		const player = this.connectedUsers[turn];
		let points = this.text.length;
			
			this.connectedUsers[turn].score - points;

			console.log(player.name + ' has ' + player.score + ' points' );
			console.log(this.connectedUsers[turn].score);
			io.emit('lost_points', this.connectedUsers, room);
			clearTimeout(this.timeOut);
			this.text= '';
			this.next_turn();

			if (player.score <= 0) {
				io.emit('player_lost', player.id);
		}

	}


}

module.exports = function(socket){

	socket.on(NEW_ROOM, (id, user, callback) => {
		let newRoom = new SessionObject();
		newRoom.addUser(user, id);
		sessions.push(newRoom);
		db.Word.find({"word": 'apple'},(err, data) => {
			if(err) console.log(err);
			console.log(data.length)
			callback(sessions, newRoom.room, newRoom.connectedUsers, data);
		})
		
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

		for (var i = 0; i < sessions.length; i ++ ) {
			for ( var j = 0; j < sessions[i].connectedUsers.length; j++) {
				if (sessions[i].connectedUsers[j].id === socket.id) {
					console.log('found user disconnected: ' + sessions[i].connectedUsers[j].id);

					const id = sessions[i].connectedUsers[j].id;

					sessions[i].connectedUsers = sessions[i].connectedUsers.filter((user) => user.id !== id);

			io.emit(USER_DISCONNECTED, sessions[i].connectedUsers , sessions[i].room );
			console.log("Disconnect", sessions[i].connectedUsers);
		}
	  }	
	 }
	});

	

	socket.on(START, (room_id, callback) => {
		console.log(room_id);
		var index = sessionSearch(room_id);
		io.emit('START', sessions[index].room, sessions[index].connectedUsers);
		callback(room_id);
		sessions[index].next_turn(room_id);
	});

	
	//Letter is passed through and added to array
	socket.on(LETTER_UPDATE, (data, room )=> {
		const index = sessionSearch(room);
		const text = sessions[index].text
		console.log('text:' + text);
			text.push(data);
			io.emit('LETTER_UPDATE', text, room);
			console.log(text);

			activePlayer = sessions[index].connectedUsers[sessions[index].turn].name;
			console.log( activePlayer + ' went');
		
		
			sessions[index].resetTimout(room);
			sessions[index].next_turn(room);
		
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

	socket.on(WORD_CHALLENGED, (data, room, type) => {
		var check = checkWord(data);
		var index = sessionSearch(room);
			if ( (check && type=== 'spell') || (!check && type === 'completed') ){
				console.log('challenged word: ' + data);
				sessions[index].currentPlayerLoss();
				
			} if ((check && type=== 'completed') || (!check && type=== 'spell')){
				sessions[index].prevPlayerLoss();

			} else {
				console.log("error");
			}
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
	console.log('word: ' + word);
	db.Word.find({"word": word}, (err, data) => {
		if(err) console.log(err);
		console.log(data);
		return data.length 


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