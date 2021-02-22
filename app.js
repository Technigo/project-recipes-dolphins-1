const main = document.getElementById('main');

const applicationID = "7bfe09bb";
// const applicationKey1= "b85adca58547211f75cf9c3a47cc424d";


const applicationKey= "6c641ba9d7108ec30c554da9cc973757";
// const applicationKey= "a82c3e69b3ddce206012513a57e2f8d9";


const applicationUrl ="https://api.edamam.com/search";
const queryText = "chicken";
const excludeText = "parsley";
const healthType = ["vegan", "alcohol-free"];
const numberOfRecepies = 10;


const queryString = `${applicationUrl}?app_id=${applicationID}&app_key=${applicationKey}&q=${queryText}&excluded=${excludeText}&from=0&to=${numberOfRecepies}&health=${healthType[1]}`;



fetch(queryString)
  .then ((response) => {
   return response.json()
   console.log(response)
})
  .then ((json) => {
    console.log(json)
    json.hits.forEach((hits) => {

      main.innerHTML += `
      <h1>${hits.recipe.label}</h1><br>
      <img src=${hits.recipe.image}>
      `

        main.innerHTML += `<h3>Health Labels:</h3>`;
      hits.recipe.healthLabels.forEach((healthLabel) => {
        main.innerHTML += `
          <p>${healthLabel}</p>

        `
      })
      main.innerHTML += `<h3>Ingredients lines:</h3>`;
      hits.recipe.ingredientLines.forEach((ingridientsLine) => {
        main.innerHTML += `
          <p>${ingridientsLine}</p>
        `
      })

      main.innerHTML += `<h3>Cooking time</h3>`;
      json.hits.forEach((cookingTime) => {
      main.innerHTML += `
      <p>${cookingTime.recipe.totalTime}</p>
      `
      })


    })

})