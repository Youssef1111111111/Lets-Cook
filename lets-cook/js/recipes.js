import { loadnav , load_profile_pic } from "./shared.js";

let Recipes = JSON.parse(localStorage.getItem("Recipes")); 
let main_page = document.querySelector(".main_page")
let is_admin = localStorage.getItem("is_admin")

function loadMyRecipes(){
    if(Recipes.length == 0){
        main_page.innerHTML=""
        if(is_admin == "Admin"){
            main_page.innerHTML = `
            <h1 class="title"> Flavors of the World: Your Ultimate Recipe Book </h1>
            <h1 class="empty"> Let’s get cooking! Add your first recipe and share your flavor with the world. </h1>
            <a href="./AddProduct.html"> <button class="add_ingredient"> Add Recipe </button> </a>`
        }
        else{
            main_page.innerHTML = `
            <h1 class="title"> Flavors of the World: Your Ultimate Recipe Book </h1>
            <h1 class="empty"> We're still cooking things up—check back soon for our first delicious recipes! </h1>`
        }
     
    }

    else{
        main_page.innerHTML=`<h1 class="title"> Flavors of the World: Your Ultimate Recipe Book </h1>`
        for(let i = 0 ; i < Recipes.length ; i++){
            let Recipe = Recipes[i];
            let RecipeName = Recipe.Name;
            let RecipeCourse = Recipe.Course;
            let RecipeDescription = Recipe.description;
            let RecipeImage = Recipe.image;
            let user_fav_arr = JSON.parse(localStorage.getItem('UserFavourites'));
            let recipe_card = document.createElement("div")
            recipe_card.classList.add("recipe_card")
            recipe_card.dataset.recipeId = Recipe.RecipeId;
            recipe_card.innerHTML = ` 
                <div class="Recipe">
                    <div class="text_details">
                        <h1 class="recipe_name"> ${RecipeName} </h1>
                        <h2 class="course"> ${RecipeCourse} </h2>
                        <p class="description"> ${RecipeDescription} </p>
                       <img src="./images/favourite.png" alt="" class="Favourite_recipe">
                    </div>
                    <div class="display_recipe_image"></div>
                    <a href="./Ingredients.html" class="view_int"></a>
                </div>`
            let fav_bt = recipe_card.querySelector(".Favourite_recipe");
            if(user_fav_arr.includes(String(Recipe.RecipeId))){
                fav_bt.setAttribute("src","./images/favourite(2).png")
            }
            fav_bt.addEventListener("click",function(){
                fav_bt.setAttribute("src","./images/favourite(2).png")
                let currentid = fav_bt.closest(".recipe_card").dataset.recipeId;
                let user_fav = JSON.parse(localStorage.getItem('UserFavourites'));
                if(user_fav.includes(currentid)){
                   fav_bt.setAttribute("src","./images/favourite.png")
                   user_fav = removeItem(user_fav,currentid);
                }
                else{
                    user_fav.push(currentid);
                }
                localStorage.setItem('UserFavourites', JSON.stringify(user_fav));
            })
            let display_recipe_image = recipe_card.querySelector(".display_recipe_image")
            let view_int = recipe_card.querySelector(".view_int")
            view_int.addEventListener("click", function(){
                let current_recipe_id = view_int.closest(".recipe_card").dataset.recipeId;
                localStorage.setItem("CurrentRecipeId", current_recipe_id);
            });        
            display_recipe_image.style.backgroundImage = `url('${RecipeImage}')`;
            main_page.append(recipe_card);
        }
    }
   
}

function removeItem(arr,value) {
    arr = arr.filter(item => item !== value);
    return arr;
}

loadMyRecipes();
loadnav("recipes");
load_profile_pic();



        