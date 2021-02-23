// DOM
const main = document.getElementById('main');
const searchButton = document.getElementById('searchButton')
const searchField = document.getElementById('search')
const excludeField = document.getElementById('exclude')
const cssCardGrid = document.getElementById("cssCardGrid"); //ä

// API
const applicationKey = "af17760b7ade859799ec3cddac9678ce";
const applicationID = "4fcdd240";
const applicationUrl = "https://api.edamam.com/search";

let queryText = "popular";
let excludeText = " ";
const numberOfRecepies = 12;
let queryString = `${applicationUrl}?app_id=${applicationID}&app_key=${applicationKey}&q=${queryText}&excluded=${excludeText}&from=0&to=${numberOfRecepies}`;



const fixedCookingTime = ((cookingTime) => {
  if (cookingTime === 0) {
    return 'Not specified'
  } else {
    return `${cookingTime} minutes`
  }
})

const fetchRecipe = (queryString) => {
  fetch(queryString)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(json)
      json.hits.forEach((hits) => {
        const image = hits.recipe.image;
        const label = hits.recipe.label;
        const cookingTime = hits.recipe.totalTime;
        const source = hits.recipe.source;
        const linkToRecipe = hits.recipe.url;
        const ingredients = hits.recipe.ingredientLines;

        cssCardGrid.innerHTML += `
      <div id="cssCard" class="css-card">
      <div id="cssCardImg" class="css-card-image">
      <img src=${image}>
      </div>
      <div id="cssCardContent" class="css-card-content">
        <a href="${linkToRecipe}"><h2>${label}</h2></a>
        <p>Cooking time: ${fixedCookingTime(cookingTime)}</p>
      </div>
      </diV>
      `
      })

    })
}
searchButton.addEventListener('click', () => {
  queryText = searchField.value;
  excludeText = excludeField.value;
  console.log(queryText);
  console.log(excludeText);
  queryString = `${applicationUrl}?app_id=${applicationID}&app_key=${applicationKey}&q=${queryText}&excluded=${excludeText}&from=0&to=${numberOfRecepies}`;
  cssCardGrid.innerHTML = "";
  searchField.value = "";
  excludeField.value = "";
  fetchRecipe(queryString);
})
fetchRecipe(queryString);