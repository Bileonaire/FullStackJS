searchInput = document.querySelector("#searchInput");
dropBtn = document.querySelector("#dropdownCatBtn");
catDropdown = document.querySelector("#categoryDropdown");
mainContent = document.querySelector("#mainDisplay");
searchButton = document.querySelector("#searchBtn");



catDropdown.addEventListener("click", (event) => {
    dropBtn.value = event.target.textContent;
    dropBtn.textContent = event.target.textContent;
});

function commaThousand(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

searchButton.addEventListener('click', getData);

// ------------------------------------------
// GET SEARCH DATA
// ------------------------------------------

function getData() {
    fetch('/ajax/?' + new URLSearchParams({
    category: dropBtn.value,
    search: searchInput.value,}))
        .then(checkStatus)
        .then(res => res.json())
        .then(response => generateHTML(response.data))
        .catch(error => console.log('Looks like there was a problem!', error))
}

function generateHTML(items) {
    mainContent.innerHTML = "";
    for(let i=0; i < items.length; i++ ) {
        const html = `<div class="col-6 col-md-4 col-lg-3 mb-4">
                    <div class="card h-100 border-secondary">
                    <img class="card-img-top img-thumbnail img-fluid" src="/media/${ items[i].product_image }" alt="${ items[i].product_name }">
                    <div class="card-body">
                    <h5 class="card-title text-capitalize">${ items[i].product_name }</h5>
                    <h5><small class="text-muted">KES </small>${ commaThousand(items[i].price) }</h5>
                    </div>
                    </div>
                    </div>`;
        mainContent.insertAdjacentHTML("beforeend", html);
    }
}
