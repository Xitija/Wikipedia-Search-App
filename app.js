let searchForm = document.getElementById("searchForm");
let searchInput = document.getElementById("searchInput");
let resultList = document.getElementById("resultsList");
let listEmpty = document.getElementById("listEmpty");

listEmpty.style.display  = "none";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  displaySearchResults(searchInput.value);
});

function displaySearchResults(searchValue) {
  let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchValue}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data?.error?.code === "missingparam") {
        alert("Please enter what is to be searched.");
        console.log(data.error);
      } else {
        resultsOnPage(data.query.search);
      }
    })
    .catch(function () {
      console.log("An error occurred");
    });
}

function resultsOnPage(searchList) {
  resultsList.innerHTML = " ";
  resultsList.insertAdjacentHTML(
    "beforeend",
    `<h2>Search Results for ${searchInput.value} </h2>`
  );

  if (!searchList.length) {
    resultsList.innerHTML = " ";
    resultsList.insertAdjacentHTML(
      "beforeend",
      `<h2>No Results found for ${searchInput.value} </h2>`
    );
    listEmpty.style.display  = "block";
  }

  searchList.forEach(function (item) {
    let itemTitle = item.title;
    let itemSnippet = item.snippet;
    let itemUrl = encodeURI(`https://en.wikipedia.org/wiki/${item.title}`);
    listEmpty.style.display  = "none";

    resultsList.insertAdjacentHTML(
      "beforeend",
      `<div class="resultItem">
        <h3 class="resultTitle">
            <a href="${itemUrl}" target="_blank" rel="noopener">${itemTitle}</a>
        </h3>
        <p class="resultSnippet">
            <a href="${itemUrl}"  target="_blank" rel="noopener">${itemSnippet}</a>
        </p>
       </div>`
    );
  });
}
