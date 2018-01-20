module.exports = function(app, passport, db, path) {

	// app.get("/signup", (req,res) => {
	// 	res.sendFile(__dirname +"/signUpTest.html");
	// });

	// app.get("/login", (req, res) => {
	// 	res.sendFile(__dirname + "/loginTest.html");
	// }); 

	app.get("/users", (req,res) => {
		db.User.find().then(user => {
			res.json(user);
		}).catch(err => {
			console.log(err);
		}); 
	});

	app.post("/signup", passport.authenticate('signup', {
		// successRedirect:'/home',
		// failureRedirect: '/signup',
		// successFlash: 'Welcome', 
		// failureFlash: true
	}), (req, res, something, otherThing) => {
		res.send(something, otherThing);
	});

	app.post("/login", passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/login',
		failureFlash: true
	}));


	// app.get("/home", isLoggedIn, (req, res) => {
		// res.sendFile(__dirname + "/home.html");
		// res.send("hello");
	// });

	app.get("/thing", (req,res) => {
		res.send("hi");
	});

	// app.get('/*', (req, res) => {
	// 	res.sendFile(path.join(__dirname, '../build/index.html'));
	// })

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated()) return next();

		res.redirect("/");
	} 
}


