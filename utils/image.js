function image({ url, portfolio_url, photographer, description }) {
  const image = document.createElement(`div`);
  image.classList.add(`image`);
  image.innerHTML = `
        <img src=${url} alt="image" />
        <h4 class="photographer">
            <a href = ${portfolio_url}>${photographer}</a>
        </h4>
        <p class="about">${description}</p>
    `;

  return image;
}

export default image;
