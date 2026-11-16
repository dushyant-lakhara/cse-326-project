// ===== 1. LIBRARY SEARCH (works only on library.html) =====

// Find the search box on the page using its id
var searchBox = document.getElementById("search");

// If this page has a search box, run the code inside
if (searchBox) {

  // Run this function every time a key is released in the search box
  searchBox.addEventListener("keyup", function () {

    // Get the typed text and make it small letters
    var text = searchBox.value.toLowerCase();

    // ---- Filter the table rows ----
    var rows = document.querySelectorAll("table tr");
    var count = 0;

    for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName("td");

      // Header rows have no td, so skip them
      if (cells.length === 0) {
        continue;
      }

      // The first cell holds the file title
      var title = cells[0].textContent.toLowerCase();

      // Show the row if the title contains the typed text, else hide it
      if (title.indexOf(text) !== -1) {
        rows[i].style.display = "";
        count = count + 1;
      } else {
        rows[i].style.display = "none";
      }
    }

    // ---- Filter the book cards ----
    var cards = document.querySelectorAll(".card");

    for (var j = 0; j < cards.length; j++) {
      var cardTitle = cards[j].querySelector("h3").textContent.toLowerCase();

      if (cardTitle.indexOf(text) !== -1) {
        cards[j].style.display = "";
      } else {
        cards[j].style.display = "none";
      }
    }

    // ---- Show how many files were found ----
    document.getElementById("result-count").textContent = count + " file(s) found";
  });
}


// ===== 2. FORM MESSAGES (works on every form) =====

// Get all forms on the page
var forms = document.querySelectorAll("form");

for (var k = 0; k < forms.length; k++) {

  // Run this function when a form is submitted
  forms[k].addEventListener("submit", function (event) {

    // Stop the page from reloading
    event.preventDefault();

    // The form that was submitted
    var form = event.target;

    // Remove an old message if there is one
    var oldMessage = form.querySelector(".success");
    if (oldMessage) {
      oldMessage.remove();
    }

    // Create a new message paragraph
    var message = document.createElement("p");
    message.className = "success";
    message.textContent = form.getAttribute("data-message");

    // Add the message at the end of the form
    form.appendChild(message);

    // Clear all the fields
    form.reset();
  });
}
