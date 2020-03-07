let bookGenre = "No genre selected.";
let bookArray = [];

// ctor for book objects
let BookObject = function(pTitle, pAuthor, pGenre, pPublishDate) {
  this.Title = pTitle;
  this.Author = pAuthor;
  this.Genre = pGenre;
  this.PublishDate = pPublishDate;
};

document.addEventListener("DOMContentLoaded", function() {
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
          (document.location.href = "index.html#inventory")
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

  $(document).on("pagebeforeshow", "#bookInfo", function (event) {
    let tempTitle = document.getElementById("TitleParam").innerHTML;
    bookArray.forEach(function(element) {
      let li = document.createElement("li");
      li.innerHTML = element.Title + " " + element.Author + " " + element.Genre + " " + element.PublishDate;
    })
  });

});

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
  const bookA = a.Title.toUpperCase();
  const bookB = b.Title.toUpperCase();

  let compare = 0;
  if (bookA > bookB) {
    compare = 1;
  } else if (bookA < bookB) {
    compare = -1;
  }
  return compare;
}

function sortGenre(a, b) {
  const bookA = a.Genre.toUpperCase();
  const bookB = b.Genre.toUpperCase();

  let compare = 0;
  if (bookA > bookB) {
    compare = 1;
  } else if (bookA < bookB) {
    compare = -1;
  }
  return compare;
}

function sortAuthor(a, b) {
  const bookA = a.Author.toUpperCase();
  const bookB = b.Author.toUpperCase();

  let compare = 0;
  if (bookA > bookB) {
    compare = 1;
  } else if (bookA < bookB) {
    compare = -1;
  }
  return compare;
}

function sortRelease(a, b) {
  const bookA = a.PublishDate;
  const bookB = b.PublishDate;

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
