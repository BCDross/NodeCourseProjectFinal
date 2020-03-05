﻿let bookGenre = "No genre selected.";
// let userArray = [];
let bookArray = [];

// ctor for book objects
let BookObject = function(pTitle, pAuthor, pGenre, pPublishDate) {
  this.Title = pTitle;
  this.Author = pAuthor;
  this.Genre = pGenre;
  this.PublishDate = pPublishDate;
};

// ctor for user objects
// let UserObject = function(pFirstName, pLastName, pEmail) {
//   this.FirstName = pFirstName;
//   this.LastName = pLastName;
//   this.Email = pEmail;
// };

document.addEventListener("DOMContentLoaded", function() {
  // document
  //   .getElementById("btnCreateUser")
  //   .addEventListener("click", function() {
  //     let newUser = new UserObject(
  //       document.getElementById("firstName").value,
  //       document.getElementById("lastName").value,
  //       document.getElementById("email").value
  //     );
  //     addNewUser(newUser);
  //   });

  document.getElementById("btnAddBook").addEventListener("click", function() {
    let newBook = new BookObject(
      document.getElementById("title").value,
      document.getElementById("author").value,
      bookGenre,
      document.getElementById("publishDate").value
    );
    addNewBook(newBook);
  });

  $(document).bind("change", "#ddlGenre", function(event, ui) {
    bookGenre = $("#ddlGenre").val();
  });

  document.getElementById("btnSortTitle").addEventListener("click", function() {
    bookArray = bookArray.sort(sortTitle);
    createBookList();
  });

  document.getElementById("btnSortGenre").addEventListener("click", function() {
    bookArray = bookArray.sort(sortGenre);
    createBookList();
  });

  document
    .getElementById("btnSortAuthor")
    .addEventListener("click", function() {
      bookArray = bookArray.sort(sortAuthor);
      createBookList();
    });

  document
    .getElementById("btnSortRelease")
    .addEventListener("click", function() {
      bookArray = bookArray.sort(sortRelease);
      createBookList();
    });

  document
    .getElementById("btnDeleteBook")
    .addEventListener("click", function() {
      let deleteBook = document.getElementById("deletedBook").value;
      fetch("books/deleteBook/" + deleteBook, {
        method: "DELETE"
      })
        .then(responsePromise1 => responsePromise1.text())
        .then(
          responsePromise2 => console.log(responsePromise2),
          (document.location.href = "index.html#refreshPage")
        )
        .catch(function(err) {
          console.log(err);
          alert(err);
        });
    });

  $(document).on("pagebeforeshow", "#inventory", function(event) {
    GetBooksFromServer();
  });

  $(document).on("pagebeforeshow", "#search", function(event) {
    GetBooksFromServer();
  });

  $(document).on("pagebeforeshow", "#bookDetailPage", function (event) {
    let tempTitle = document.getElementById("TitleParam").innerHTML;
    for(let i = 0; i < bookArray.length; i++) {
      if(bookArray[i].Title = tempTitle){
        document.getElementById("BookTitle").innerHTML = "The title is: " + bookArray[i].Title;
        document.getElementById("BookAuthor").innerHTML = "The author is: " + bookArray[i].Author;
        document.getElementById("BookGenre").innerHTML = "The genre is: " + bookArray[i].Genre;
        document.getElementById("BookDate").innerHTML = "The publish date is: " + bookArray[i].PublishDate;
      }
    }
  });

  // $(document).on("pagebeforeshow", "#users", function(event) {
  //   createUserList();
  // });
});

// function createUserList() {
//   //Clear the list
//   let divUsers = document.getElementById("divUsers");
//   while (divUsers.firstChild) {
//     divUsers.removeChild(divUsers.firstChild);
//   }

//   let ul = document.createElement("ul");
//   userArray.forEach(function(element) {
//     let li = document.createElement("li");
//     li.innerHTML =
//       element.FirstName + " " + element.LastName + " " + element.Email;
//     ul.appendChild(li);
//   });
//   divUsers.appendChild(ul);
// }

function createBookList() {
  let divBooks = document.getElementById("divBooks");
  while (divBooks.firstChild) {
    divBooks.removeChild(divBooks.firstChild);
  }
  let ul = document.createElement("ul");
  bookArray.forEach(function(element) {
    let li = document.createElement("li");
    li.innerHTML =
      "<a data-transition='pop' class='book' data-parm=" +
      element.Title +
      " href='#home'>Get Details </a> " +
      " " +
      element.Title + 
      " " +
      element.Author +
      " " +
      element.Genre +
      " " +
      element.PublishDate;
    ul.appendChild(li);
  });
  divBooks.appendChild(ul);

  var classname = document.getElementsByClassName("book");
  Array.from(classname).forEach(function(element) {
    element.addEventListener("click", function() {
      var parm = this.getAttribute("data-parm");
      document.getElementById("TitleParam").innerHTML = parm;
      document.location.href = "index.html#bookDetailPage";
    });
  });
}

function createSearchList() {
  let divSearches = document.getElementById("divSearch");
  while (divSearches.firstChild) {
    divSearches.removeChild(divSearches.firstChild);
  }
  let ul = document.createElement("ul");
  bookArray.forEach(function(element) {
    let li = document.createElement("li");
    li.innerHTML =
      element.title +
      " " +
      element.author +
      " " +
      element.genre +
      " " +
      element.publishdate;
    ul.appendChild(li);
  });
  divSearches.appendChild(ul);
}

function sortTitle(a, b) {
  const bookA = a.Title.toLowerCase();
  const bookB = b.Title.toLowerCase();

  let compare = 0;
  if (bookA > bookB) {
    compare = 1;
  } else if (bookA < bookB) {
    compare = -1;
  }
  return compare;
}

function sortGenre(a, b) {
  // Use toUpperCase() to ignore character casing
  const bookA = a.Genre.toLowerCase();
  const bookB = b.Genre.toLowerCase();

  let compare = 0;
  if (bookA > bookB) {
    compare = 1;
  } else if (bookA < bookB) {
    compare = -1;
  }
  return compare;
}

function sortAuthor(a, b) {
  // Use toUpperCase() to ignore character casing
  const bookA = a.Author.toLowerCase();
  const bookB = b.Author.toLowerCase();

  let compare = 0;
  if (bookA > bookB) {
    compare = 1;
  } else if (bookA < bookB) {
    compare = -1;
  }
  return compare;
}

function sortRelease(a, b) {
  // Use toUpperCase() to ignore character casing
  const bookA = a.PublishDate.toLowerCase();
  const bookB = b.PublishDate.toLowerCase();

  let compare = 0;
  if (bookA > bookB) {
    compare = 1;
  } else if (bookA < bookB) {
    compare = -1;
  }
  return compare;
}

function GetBooksFromServer() {
  fetch("/books/bookList")
    .then(function(theResponsePromise) {
      return theResponsePromise.json();
    })
    .then(function(serverData) {
      console.log(serverData);
      bookArray.length = 0;
      bookArray = serverData;
      createBookList();
    })
    .catch(function(err) {
      console.log(err);
    });
}

function addNewBook(newBook) {
  const request = new Request("/books/addBook", {
    method: "POST",
    body: JSON.stringify(newBook),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  });

  fetch(request)
    .then(theResponsePromise => theResponsePromise.json())
    .then(
      theResponsePromiseJson => console.log(theResponsePromiseJson),
      (document.location.href = "#inventory")
    )
    .catch(function(err) {
      console.log(err);
    });
}
