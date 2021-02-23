const main = document.getElementById('main');
const searchButton = document.getElementById('searchButton')
const cssCardGrid = document.getElementById("cssCardGrid");

//const applicationID = "4fcdd240";
// const applicationKey = "86fbda45bf039fe0a2dd29fdedc2f8d8";

const applicationKey = "b85adca58547211f75cf9c3a47cc424d";
const applicationID = "7bfe09bb";

// const applicationKey= "6c641ba9d7108ec30c554da9cc973757";
// const applicationID = "1b5c3465";


// Skapa en funktion likt generateBoard() från Guess Who som syns från början.
// När man sedan söker/filtrerar så genereras en annan innerHTML med sökresultatet
const applicationUrl = "https://api.edamam.com/search";
const queryText = "popular"; //Denna ska vara tom. Behöver en funktion som hämtar in värdet från sök/filter/knapp .
const excludeText = " "; //Denna ska vara tom. Behöver en funktion som hämtar in värdet från sök/filter/knapp .
//const healthType = ["vegan", "alcohol-free"];
const numberOfRecepies = 12;

const queryString = `${applicationUrl}?app_id=${applicationID}&app_key=${applicationKey}&q=${queryText}&excluded=${excludeText}&from=0&to=${numberOfRecepies}`;



const fixedCookingTime = ((cookingTime) => {
  if (cookingTime === 0) {
    return 'Not specified'
  } else {
    return `${cookingTime} minutes`
  }
})

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


      {
        /* <h1>${label}</h1><br>
              <img src=${image}>
              <p>Cooking time:${fixedCookingTime(cookingTime)}</p>
              <p>Source:${source}</p>
              <p>Link to recipe: ${linkToRecipe}</p>
              <p>Ingredients: ${ingredients}</p> */
      }


      cssCardGrid.innerHTML += `
      <div id="cssCard" class="css-card">
      <div id="cssCardImg" class="css-card-image">
      <img src=${image}>
      </div>
      <div id="cssCardContent" class="css-card-content">
        <div id="cssCardContentTitle" class="css-card-content-title">
        <h2>${label}</h2>
        <p>Cooking time: ${fixedCookingTime(cookingTime)}</p>
        </div>
        <div id="cssCardContentType" class="css-card-content-type">
          <p>Type: Beef/Chicken/Vego</p>
        </div>
      </div>
      </div>








      `

    })

  })
  searchButton.addEventListener('click', () => {

  })