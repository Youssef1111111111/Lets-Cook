import {loadnav , load_profile_pic } from "./shared.js";
let Recipes = JSON.parse(localStorage.getItem("Recipes")); 
let main_page = document.querySelector(".main_page")
let empty = document.querySelector(".empty")

function loadMyRecipes(){
    if(Recipes.length == 0){
        main_page.innerHTML=""
        main_page.innerHTML = `
        <h1 class="title"> My Recipe Collection </h1>
        <h1 class="empty"> Let’s get cooking! Add your first recipe and share your flavor with the world. </h1>
        <a href="./AddProduct.html"> <button class="add_ingredient"> Add Recipe </button> </a>`
    }
    else{
        main_page.innerHTML=`<h1 class="title"> My Recipe Collection </h1>`
        for(let i = 0 ; i < Recipes.length ; i++){
            let Recipe = Recipes[i];
            let RecipeName = Recipe.Name;
            let RecipeCourse = Recipe.Course;
            let RecipeDescription = Recipe.description;
            let RecipeImage = Recipe.image;
            let recipe_card = document.createElement("div")
            recipe_card.classList.add("recipe_card")
            recipe_card.dataset.recipeId = Recipe.RecipeId;
            recipe_card.innerHTML = ` 
                <div class="Recipe">
                    <div class="text_details">
                        <h1 class="recipe_name"> ${RecipeName} </h1>
                        <div class="edit">
                            <h2 class="course"> ${RecipeCourse} </h2>
                            <img src="./images/output-onlinepngtools(4).png" class="edit_icon">
                        </div>
                        <p class="description"> ${RecipeDescription} </p>
                        <img src="./images/del.png" alt="" class="delete_recipe">
                    </div>
                    <div class="display_recipe_image"></div>
                    <a href="./Ingredients.html" class="view_int"></a>
                </div>
                `
            let display_recipe_image = recipe_card.querySelector(".display_recipe_image")
            let view_int = recipe_card.querySelector(".view_int")
            let edit_button = recipe_card.querySelector(".edit_icon")
            let delete_bt = recipe_card.querySelector(".delete_recipe")
            view_int.addEventListener("click", function(){
                let current_recipe_id = view_int.closest(".recipe_card").dataset.recipeId;
                localStorage.setItem("CurrentRecipeId", current_recipe_id);
            });      
            edit_button.addEventListener("click", function(){
                let current_recipe_id = view_int.closest(".recipe_card").dataset.recipeId;
                localStorage.setItem("CurrentRecipeId", current_recipe_id);
                localStorage.setItem("isedit" , "true");
                window.location.href = "AddProduct.html";
            });      
    
            delete_bt.addEventListener("click", function(){
                let recipe_index;
                let current_recipe_id = view_int.closest(".recipe_card").dataset.recipeId;
                let recipe = view_int.closest(".recipe_card");
                let Recipes_arr = JSON.parse(localStorage.getItem("Recipes")); 
                for(let i = 0 ; i < Recipes.length ; i++){
                    if(Recipes[i].RecipeId == current_recipe_id){
                        recipe_index = i;
                        break;
                    }
                }
                Recipes_arr.splice(recipe_index, 1); 
                recipe.remove()
                localStorage.setItem("Recipes", JSON.stringify(Recipes_arr));
            });
    
            display_recipe_image.style.backgroundImage = `url('${RecipeImage}')`;
            main_page.append(recipe_card);
        }
    }
   
}


loadnav("myrecipes");
load_profile_pic()
loadMyRecipes()

        