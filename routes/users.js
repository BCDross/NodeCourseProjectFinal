var express = require('express');
var router = express.Router();

let serverUserArray = []; // our "permanent storage" on the web server

// define a constructor to create user objects
let UserObject = function(pFirstName, pLastName, pEmail) {
  this.FirstName = pFirstName;
  this.LastName = pLastName;
  this.Email = pEmail;
}

/* POST to addUser */
router.post('/addUser', function(req, res) {
  console.log(req.body);
  serverUserArray.push(req.body);
  console.log(serverUserArray);
  //res.sendStatus(200);
  res.status(200).send(JSON.stringify('success'));
});


/* GET userList. */
router.get('/userList', function(req, res) {
  res.json(serverUserArray);
 });

 /* DELETE to deleteUser. */
 router.delete('/deleteUser/:Title', function(req, res) {
  let Title = req.params.Title;
  Title = Title.toLowerCase();  // allow user to be careless about capitalization
  console.log('deleting ID: ' + Title);
   for(let i=0; i < serverUserArray.length; i++) {
     if(Title == (serverUserArray[i].Title).toLowerCase()) {
     serverUserArray.splice(i,1);
     }
   }
   res.status(200).send(JSON.stringify('deleted successfully'));
});


//  router.???('/userlist', function(req, res) {
//  users.update({name: 'foo'}, {name: 'bar'})



module.exports = router;

