var express = require('express');
var router = express.Router();

let serverBookArray = [];

// ctor
let BookObject = function(pTitle, pAuthor, pGenre, pPublishDate) {
  this.Title = pTitle;
  this.Author = pAuthor;
  this.Genre = pGenre;
  this.PublishDate = pPublishDate;
}

// Starter list of books.
serverBookArray.push(
  new BookObject("The Way of Kings", "Brandon Sanderson", "Fantasy", 2011)
);
serverBookArray.push(
  new BookObject("Words of Radiance", "Brandon Sanderson", "Fantasy", 2014)
);
serverBookArray.push(
  new BookObject("Oathbringer", "Brandon Sanderson", "Fantasy", 2017)
);
serverBookArray.push(
  new BookObject("Timegods' World", "LE Modesitt Jr.", "SciFi", 1985)
);
serverBookArray.push(
  new BookObject("The Forever Hero", "LE Modesitt Jr.", "SciFi", 1990)
);
serverBookArray.push(
  new BookObject("The Black Company", "Glen Cook", "Fantasy", 1984)
);
serverBookArray.push(
  new BookObject("Angels and Demons", "Dan Brown", "Fiction", 2000)
);
serverBookArray.push(
  new BookObject("The Da Vinci Code", "Dan Brown", "Fiction", 2002)
);
serverBookArray.push(
  new BookObject("The Lost Symbol", "Dan Brown", "Fiction", 2009)
);
serverBookArray.push(
  new BookObject("Inferno", "Dan Brown", "Fiction", 2012)
);
serverBookArray.push(
  new BookObject("Stranger in a strange land", "Robert Heinlein", "SciFi", 1960)
);
serverBookArray.push(
  new BookObject("Starship Troopers", "Robert Heinlein", "SciFi", 1965)
);
serverBookArray.push(
  new BookObject("The Hunt for Red October", "Tom Clancy", "Fiction", 1984)
);
serverBookArray.push(
  new BookObject("Without Remorse", "Tom Clancy", "Fiction", 1988)
);

router.post('/addBook', function(req, res) {
  console.log(req.body);
  serverBookArray.push(req.body);
  console.log(serverBookArray);
  res.status(200).send(JSON.stringify('success'));
});

router.get('/bookList', function(req, res) {
  res.json(serverBookArray);
 });

 router.delete('/deleteBook/:Title', function(req, res) {
  let Title = req.params.Title;
  Title = Title.toUpperCase();
  console.log('deleting ID: ' + Title);
   for(let i=0; i < serverBookArray.length; i++) {
     if(Title == (serverBookArray[i].Title).toUpperCase()) {
     serverBookArray.splice(i,1);
     }
   }
   res.status(200).send(JSON.stringify('deleted successfully'));
});

module.exports = router;