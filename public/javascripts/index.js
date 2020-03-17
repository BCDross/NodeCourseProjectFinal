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

  document
    .getElementById("btnSortTitleAsc")
    .addEventListener("click", function() {
      bookArray = bookArray.sort(sortTitleAsc);
      createSearchList();
    });

  document
    .getElementById("btnSortGenreAsc")
    .addEventListener("click", function() {
      bookArray = bookArray.sort(sortGenreAsc);
      createSearchList();
    });

  document
    .getElementById("btnSortAuthorAsc")
    .addEventListener("click", function() {
      bookArray = bookArray.sort(sortAuthorAsc);
      createSearchList();
    });

  document
    .getElementById("btnSortReleaseAsc")
    .addEventListener("click", function() {
      bookArray = bookArray.sort(sortReleaseAsc);
      createSearchList();
    });

  document
    .getElementById("btnSortTitleDesc")
    .addEventListener("click", function() {
      bookArray = bookArray.sort(sortTitleDesc);
      createSearchList();
    });

  document
    .getElementById("btnSortGenreDesc")
    .addEventListener("click", function() {
      bookArray = bookArray.sort(sortGenreDesc);
      createSearchList();
    });

  document
    .getElementById("btnSortAuthorDesc")
    .addEventListener("click", function() {
      bookArray = bookArray.sort(sortAuthorDesc);
      createSearchList();
    });

  document
    .getElementById("btnSortReleaseDesc")
    .addEventListener("click", function() {
      bookArray = bookArray.sort(sortReleaseDesc);
      createSearchList();
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

  $(document).on("pagebeforeshow", "#bookDetailPage", function(event) {
    GetBooksInventoryFromServer();
    let tempTitle = document.getElementById("TitleParam").innerHTML;
    for (let i = 0; i < bookArray.length; i++) {
      if (bookArray[i].Title == tempTitle) {
        document.getElementById("BookTitle").innerHTML =
          "The title is: " + bookArray[i].Title.replace(/ /g, "/%20");
        document.getElementById("BookAuthor").innerHTML =
          "The author is: " + bookArray[i].Author;
        document.getElementById("BookGenre").innerHTML =
          "The genre is: " + bookArray[i].Genre;
        document.getElementById("BookDate").innerHTML =
          "The publish date is: " + bookArray[i].PublishDate;
      }
    }
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
      element.Title.replace(/ /g, "+") +
      " href='#home'>Get Details </a> " +
      " " +
      element.Title +
      " " +
      element.Genre;
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

function sortTitleAsc(a, b) {
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

function sortTitleDesc(a, b) {
  const bookA = a.Title.toLowerCase();
  const bookB = b.Title.toLowerCase();

  let compare = 0;
  if (bookA < bookB) {
    compare = 1;
  } else if (bookA > bookB) {
    compare = -1;
  }
  return compare;
}

function sortGenreAsc(a, b) {
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

function sortGenreDesc(a, b) {
  const bookA = a.Genre.toLowerCase();
  const bookB = b.Genre.toLowerCase();

  let compare = 0;
  if (bookA < bookB) {
    compare = 1;
  } else if (bookA > bookB) {
    compare = -1;
  }
  return compare;
}

function sortAuthorAsc(a, b) {
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

function sortAuthorDesc(a, b) {
  const bookA = a.Author.toLowerCase();
  const bookB = b.Author.toLowerCase();

  let compare = 0;
  if (bookA < bookB) {
    compare = 1;
  } else if (bookA > bookB) {
    compare = -1;
  }
  return compare;
}

function sortReleaseAsc(a, b) {
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

function sortReleaseDesc(a, b) {
  const bookA = a.PublishDate;
  const bookB = b.PublishDate;

  let compare = 0;
  if (bookA < bookB) {
    compare = 1;
  } else if (bookA > bookB) {
    compare = -1;
  }
  return compare;
}

function GetBooksInventoryFromServer() {
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

function GetBooksSearchFromServer() {
  fetch("/books/bookList")
    .then(function(theResponsePromise) {
      return theResponsePromise.json();
    })
    .then(function(serverData) {
      console.log(serverData);
      bookArray.length = 0;
      bookArray = serverData;
      createSearchList();
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
