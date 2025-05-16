import {loadnav , load_profile_pic } from "./shared.js";
let add_bt = document.querySelector(".add_ingredient")
let ingredient_name_input = document.querySelector("#ingredient_name_input") 
let ingredient_quantity_input = document.querySelector("#ingredient_quan_input") 
let ingredients_data = document.querySelector(".ingredients_data")
let ingredient_quan_input = document.getElementById('ingredient_quan_input');
let recipe_name_input = document.querySelector(".take_input")
let select_course = document.querySelector(".select_course")
let add_recipe_bt = document.querySelector("#add_recipe_bt")
let ingredients_contaier = document.querySelector(".ingredients")
let input_img  = document.querySelector(".input_img")
let display_image = document.querySelector(".recipe_image")
let desc_input = document.querySelector("#desc_input")
let WantedRecipe;
let recipe_index;

if (localStorage.getItem('recipeId') === null) {
    localStorage.setItem('recipeId', 0);
}

let recipe_id = localStorage.getItem("recipeId");
let ingrediet_id = 0;
let image_url ;
let ingredients_arr = []
let Recipes = []

input_img.addEventListener("change", function(event) {
    const file = event.target.files[0]; 
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            console.log(e.target.result);
            display_image.style.backgroundImage = `url('${imageUrl}')`;
            image_url = imageUrl;
        };
        reader.readAsDataURL(file);
    } 
    document.querySelector(".upload_icon").classList.add("none")
   
});

function create_ingredient(){
    let ingredient_name = ingredient_name_input.value;
    let ingredient_quantity = ingredient_quantity_input.value;
    if (!ingredient_name || !ingredient_quantity) return;
    
    let ingredient = document.createElement("div"); 
    ingredient.innerHTML = `
        <div class="ingredient">
            <h1 class="ingredient_quan">x${ingredient_quantity}</h1>
            <h1 class="ingredient_name">${ingredient_name}</h1>
            <img src="./images/remove.svg" class="remove">
        </div>
        <hr class="line">  
    `;

    ingredient.value = ++ingrediet_id;

    let remove_bt = ingredient.querySelector(".remove");
    remove_bt.addEventListener("click", function(){remove_ingredient(remove_bt)});
    ingredients_data.append(ingredient);
    ingredients_arr.push(
        {
            IngredietId:ingrediet_id,
            IngredientName:ingredient_name,
            IngredientqQuantity: ingredient_quantity
        }
    )

}

function remove_ingredient(remove_bt){
    let ingredient = remove_bt.closest(".ingredient").parentElement;
    let ingredientId = ingredient.value; 
    let index = ingredients_arr.findIndex(item => item.IngredietId === ingredientId);
    if (index !== -1) {
        ingredients_arr.splice(index, 1); 
    }
    ingredient.remove(); 
    
}


ingredient_quan_input.addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
});


function add_recipe(){
    let all_done = true;
    if(!recipe_name_input.value){
        let titleElement = recipe_name_input.previousElementSibling;
        titleElement.classList.add("empty_title")
        recipe_name_input.classList.add("empty_input");
        all_done = false;
    }
    else{
        let titleElement = recipe_name_input.previousElementSibling;
        titleElement.classList.remove("empty_title")
        recipe_name_input.classList.remove("empty_input");
    }

    if(!select_course.value){
        let titleElement = select_course.previousElementSibling;
        titleElement.classList.add("empty_title")
        select_course.classList.add("empty_input");
        all_done = false;
    }
    else{
        let titleElement = select_course.previousElementSibling;
        titleElement.classList.remove("empty_title")
        select_course.classList.remove("empty_input");
    }

    if(ingredients_arr.length == 0){
        let titleElement = ingredient_name_input.previousElementSibling;
        titleElement.classList.add("empty_title")
        ingredient_name_input.classList.add("empty_input");
        let title_quan_Element = ingredient_quan_input.previousElementSibling;
        title_quan_Element.classList.add("empty_title")
        ingredient_quan_input.classList.add("empty_input");
        let title_cont_Element = ingredients_contaier.previousElementSibling;
        title_cont_Element.classList.add("empty_title")
        ingredients_contaier.classList.add("empty_input");
        all_done = false; ddddd
    }
    else{
        let titleElement = ingredient_name_input.previousElementSibling;
        titleElement.classList.remove("empty_title")
        ingredient_name_input.classList.remove("empty_input");
        titleElement.classList.remove("empty_title")
        ingredient_quan_input.classList.remove("empty_input");
        let title_cont_Element = ingredients_contaier.previousElementSibling;
        title_cont_Element.classList.remove("empty_title")
        ingredients_contaier.classList.remove("empty_input");
    }

    if(all_done){
        save_recipe()
        window.location.href ="Success_add.html"
    }
    
    

}

function save_recipe() {
    if(localStorage.getItem("isedit") == "true") {
        Recipes[recipe_index].Name = recipe_name_input.value;
        Recipes[recipe_index].Course = select_course.value;
        Recipes[recipe_index].description = desc_input.value;
        Recipes[recipe_index].image = image_url || "";
        Recipes[recipe_index].ingredients =  JSON.parse(JSON.stringify(ingredients_arr));
        localStorage.setItem("CurrentRecipeId" , JSON.stringify( Recipes[recipe_index].RecipeId))
        localStorage.setItem("Recipes", JSON.stringify(Recipes)); 
    }
    else{
        let newRecipe = {
            "RecipeId": ++recipe_id,
            "Name": recipe_name_input.value,
            "Course": select_course.value,
            "description": desc_input.value,
            "ingredients": ingredients_arr,
            "image": image_url || ""
        };
    
        Recipes.push(newRecipe); 
        localStorage.setItem("Recipes", JSON.stringify(Recipes)); 
        localStorage.setItem("CurrentRecipeId" , JSON.stringify(recipe_id))
        localStorage.setItem("recipeId" , recipe_id )
    }
    localStorage.setItem("ViewRecipe",false);  
      
}



function load_saved_recipes() {
    let savedRecipes = localStorage.getItem("Recipes");
    if (savedRecipes) {
        Recipes = JSON.parse(savedRecipes); 
    }
}

function edit_recipe(){
    if(localStorage.getItem("isedit") != "true") return
    let wanted_recipe_id = JSON.parse(localStorage.getItem("CurrentRecipeId"))
    Recipes = JSON.parse(localStorage.getItem("Recipes")); 
    for(let i = 0 ; i < Recipes.length ; i++){
        if(Recipes[i].RecipeId == wanted_recipe_id){
            WantedRecipe = Recipes[i];
            recipe_index = i;
            break;
        }
    }
    let RecipeName = WantedRecipe.Name;
    let RecipeCourse = WantedRecipe.Course;
    let RecipeDescription = WantedRecipe.description
    let Recipeimage = WantedRecipe.image;
    let ingredients = WantedRecipe.ingredients;
    recipe_name_input.value = RecipeName
    select_course.value = RecipeCourse;
    desc_input.value = RecipeDescription
    display_image.style.backgroundImage = `url('${Recipeimage}')`;
    image_url = Recipeimage;
    document.querySelector(".upload_icon").classList.add("none")
    for(let i = 0 ; i < ingredients.length ; i++){
        let ingredient_name = ingredients[i].IngredientName ;
        let ingredient_quantity = ingredients[i].IngredientqQuantity;
        let ingredient = document.createElement("div"); 
        ingredient.innerHTML = `
            <div class="ingredient">
                <h1 class="ingredient_quan">x${ingredient_quantity}</h1>
                <h1 class="ingredient_name">${ingredient_name}</h1>
                <img src="./images/remove.svg" class="remove">
            </div>
            <hr class="line">  
        `;
    
        ingredient.value = ++ingrediet_id;
    
        let remove_bt = ingredient.querySelector(".remove");
        remove_bt.addEventListener("click", function(){remove_ingredient(remove_bt)});
        ingredients_data.append(ingredient);
        ingredients_arr.push(
            {
                IngredietId:ingrediet_id,
                IngredientName:ingredient_name,
                IngredientqQuantity: ingredient_quantity
            }
        )
    }
    add_recipe_bt.innerText = "Save Recipe";
}

loadnav("add");
load_profile_pic();
load_saved_recipes();
edit_recipe();


add_bt.addEventListener("click" , create_ingredient)
add_recipe_bt.addEventListener("click",add_recipe)