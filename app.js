import image from "./utils/image.js";

("use strict");

const searchInput = document.querySelector(`.search-input`);
const preloader = document.querySelector(`.preloader`);
const imagesContainer = document.querySelector(`#images-container`);
const form = document.querySelector(`#form`);
const main = document.getElementById(`main`);

// ******** HANDLE EVENT *************
searchInput.addEventListener(`focusin`, (ev) => {
  ev.target.style.borderWidth = `1.3px`;
});
searchInput.addEventListener(`focusout`, (ev) => {
  ev.target.style.borderWidth = `1px`;
});

form.addEventListener(`submit`, handleSearch);

// *********** FUNCTIONS ***************
function handleSearch(ev) {
  preloader.classList.add(`show-preloader`);
  imagesContainer.innerHTML = ``;
  ev.preventDefault();
  const keyword = searchInput.value;
  let page = 1;
  showPictures(keyword, page);
  // detecting bottom
  window.addEventListener(`scroll`, (ev) => {
    if (isAtBottom()) {
      preloader.classList.add(`show-preloader`);
      page++;
      showPictures(keyword, page);
    }
  });
}

async function showPictures(keyword, page) {
  if (keyword.trim().length !== 0 && page) {
    const URL = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=******************************&per_page=15`;

    const request = await fetch(URL);
    const response = await request.json();
    console.log(response);
    const imageItems = response.results.map((result) => {
      return {
        description: result.alt_description,
        photographer: result.user.name,
        portfolio_url: result.user.portfolio_url,
        url: result.urls.small,
      };
    });

    for (let i = 0; i < imageItems.length; i++) {
      imagesContainer.appendChild(image(imageItems[i]));
      if (i === 0) {
        preloader.classList.remove(`show-preloader`);
      }
    }
  }
}

function isAtBottom() {
  const totalPageHeight = document.body.scrollHeight;
  const position = window.innerHeight + window.scrollY;
  return position >= totalPageHeight;
}
