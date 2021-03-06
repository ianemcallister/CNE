/*
*	FIREBASE
*
*	This module serves as the connection between CNE and Firebase.com.
*/

//define dependencies
var fetch 			= require('node-fetch');
var admin 			= require("firebase-admin");

//define global variables
var serviceAccount = {
	"type": 						process.env.FB_TYPE,
	"project_id": 					process.env.FB_PROJECT_ID,
	"private_key_id": 				process.env.FB_PRIVATE_KEY_ID,
	"private_key": 					process.env.FB_PRIVATE_KEY,
	"client_email": 				process.env.FB_CLIENT_EMAIL,
	"client_id": 					process.env.FB_CLIENT_ID,
	"auth_uri": 					process.env.FB_AUTH_URI,
	"token_uri": 					process.env.FB_TOKEN_URI,
	"auth_provider_x509_cert_url": 	process.env.FB_AUTH_PROVIDER_X509_CERT_URL,
	"client_x509_cert_url": 		process.env.FB_CLIENT_X509_CERT_URL
};

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ah-nuts.firebaseio.com"
});

//define module
var firebase = {
	create: create,
	read: read,
	update: update,
	del: del,
	aTest: aTest
};

function create(path, data) {
	//define local variables
	var ref = admin.database().ref(path);

	//return async work
	return new Promise(function(resolve, reject) {

		//hit the database
		ref.set(data, function(error) {
		if (error) {
		  reject("Data could not be saved." + error);
		} else {
		  resolve("Data saved successfully.");
		}
		});

	});

};

/*
*	READ
*	
*	This function function collects data from firebase
*/
function read(path) {
  
	//define local variable
	var ref = admin.database().ref(path);

	//return async work
	return new Promise(function(resolve, reject) {

		//hit the database
		ref.once("value")
		.then(function(snapshot) {
		    
			//pass the data back
			resolve(snapshot.val());

		});

	});

};

function update() {};

/*
*	DEL
*
*	This will delete a path that isn't wanted.
*/
function del(path) {
	//define local variables
	var ref = admin.database().ref(path);

	//return async work
	return new Promise(function(resolve, reject) {

		//hit the database
		ref.set(null, function(error) {
		if (error) {
		  reject("Data could not be saved." + error);
		} else {
		  resolve("Data saved successfully.");
		}
		});

	});

};

/*
*	ATEST
*
*	This function is just used for testing purposes
*/
function aTest() {
	var ref = admin.database().ref('employees');
	
	return new Promise(function(resolve, reject) {
		ref.once("value")
	    .then(function(snapshot) {
	        
	        //pass the data back
	        resolve(snapshot.val());

	    });
	});

};

//return the module
module.exports = firebase;

