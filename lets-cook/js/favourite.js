import { loadnav , load_profile_pic } from "./shared.js";

let main_page = document.querySelector(".main_page")
let Recipes = JSON.parse(localStorage.getItem("Recipes")); 
let user_fav = JSON.parse(localStorage.getItem('UserFavourites'));

function load_Fav(){
    if(user_fav.length == 0){
        let text = document.createElement("div");
        text.classList.add("text_fav");
        text.innerHTML = `
        <h1 class="title"> Your Favorite Recipes List is Empty! </h1>
        <h1 class="empty"> Explore our collection of delicious dishes, and add the ones you love to your favorites. </h1>
        <a href="./Recipes.html"> <button class="add_ingredient"> Explore </button> </a>
        `
        main_page.append(text)
        return
    }
    else{
        let text = document.createElement("div");
        text.innerHTML = `
        <h1 class="title"> Your Handpicked Recipe Collection </h1> `
        main_page.append(text)
        for(let i = 0 ; i < Recipes.length ; i++){
            let Recipe = Recipes[i];
            let Recipe_id = Recipe.RecipeId;
            if(user_fav.includes(String(Recipe_id))){
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
                        <h2 class="course"> ${RecipeCourse} </h2>
                        <p class="description"> ${RecipeDescription} </p>
                       <img src="./images/favourite.png" alt="" class="Favourite_recipe">
                    </div>
                    <div class="display_recipe_image"></div>
                    <a href="./Ingredients.html" class="view_int"></a>
                </div>`
                let fav_bt = recipe_card.querySelector(".Favourite_recipe");
                if(user_fav.includes(String(Recipe.RecipeId))){
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
}

function removeItem(arr,value) {
    arr = arr.filter(item => item !== value);
    return arr;
}

loadnav("fav");
load_profile_pic();
load_Fav();