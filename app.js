const main = document.getElementById('main');

const applicationID = "4fcdd240";
// const applicationKey1= "b85adca58547211f75cf9c3a47cc424d";


const applicationKey= "86fbda45bf039fe0a2dd29fdedc2f8d8";
// const applicationKey= "a82c3e69b3ddce206012513a57e2f8d9";

// Skapa en funktion likt generateBoard() från Guess Who som syns från början.
// När man sedan söker/filtrerar så genereras en annan innerHTML med sökresultatet
const applicationUrl ="https://api.edamam.com/search";
const queryText = "chicken"; //Denna ska vara tom. Behöver en funktion som hämtar in värdet från sök/filter/knapp .
const excludeText = "parsley"; //Denna ska vara tom. Behöver en funktion som hämtar in värdet från sök/filter/knapp .
//const healthType = ["vegan", "alcohol-free"];
const numberOfRecepies = 10;
//&health=${healthType[1]}

const queryString = `${applicationUrl}?app_id=${applicationID}&app_key=${applicationKey}&q=${queryText}&excluded=${excludeText}&from=0&to=${numberOfRecepies}`;

const fixedCookingTime = ((cookingTime) => {
  if (cookingTime === 0) {
    return'Not specified'
  } else {
    return cookingTime
  }
})

fetch(queryString)
  .then ((response) => {
   return response.json()
   console.log(response)
})
  .then ((json) => {
    console.log(json)
    json.hits.forEach((hits) => {
      const image = hits.recipe.image;
      const label = hits.recipe.label;
      const cookingTime = hits.recipe.totalTime;
      const source = hits.recipe.source;
      const linkToRecipe = hits.recipe.url;
      const ingredients = hits.recipe.ingredientLines;



      main.innerHTML += `
      <h1>${label}</h1><br>
      <img src=${image}>
      <p>Cooking time:${fixedCookingTime(cookingTime)}</p>
      <p>Source:${source}</p>
      <p>Link to recipe: ${linkToRecipe}</p>
      <p>Ingredients: ${ingredients}</p>
      `

        main.innerHTML += `<h3>Health Labels:</h3>`;
      hits.recipe.healthLabels.forEach((healthLabel) => {
        main.innerHTML += `
          <p>${healthLabel}</p>

        `
      })
      main.innerHTML += `<h3>Ingredients lines:</h3>`;
      hits.recipe.ingredientLines.forEach((ingredientLines) => {
        main.innerHTML += `
          <p>${ingredientLine}</p>
        `
      })

    })

})