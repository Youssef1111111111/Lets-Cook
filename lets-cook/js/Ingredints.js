import { loadnav , load_profile_pic } from "./shared.js";
let WantedRecipe;
let recipe_name_display = document.querySelector(".recipe_name")
let course_display = document.querySelector(".course")
let ingredients_box = document.querySelector(".ingredients_box")

function loadIngredients(){
    let wanted_recipe_id = JSON.parse(localStorage.getItem("CurrentRecipeId"))
    let Recipes = JSON.parse(localStorage.getItem("Recipes")); 
    for(let i = 0 ; i < Recipes.length ; i++){
        if(Recipes[i].RecipeId == wanted_recipe_id){
            WantedRecipe = Recipes[i];
            break;
        }
    }
    let RecipeName = WantedRecipe.Name;
    let RecipeCourse = WantedRecipe.Course;
    let ingredients = WantedRecipe.ingredients;
    recipe_name_display.innerText = RecipeName;
    course_display.innerText = RecipeCourse;
    for(let i = 0 ; i < ingredients.length ; i++ ){

        let ingredient_name = ingredients[i].IngredientName;
        let ingredient_quantity = ingredients[i].IngredientqQuantity;
        let ingredient = document.createElement("div"); 
        ingredient.innerHTML = `
        <div class="ingredient">
            <h1 class="ingredient_quan">x${ingredient_quantity}</h1>
            <h1 class="ingredient_name">${ingredient_name}</h1>
        </div>
        <hr class="line">  
        `;
        ingredients_box.append(ingredient)

    }
}



loadnav("recipes");
load_profile_pic();
loadIngredients();
