import { loadnav , load_profile_pic } from "./shared.js";

let recipe_name_display = document.querySelector(".recipe_name")
let course_display = document.querySelector(".course")
let description_display = document.querySelector(".description")
let display_recipe_image = document.querySelector(".display_recipe_image")
let title = document.querySelector(".title")
let WantedRecipe;

function change_title(){
    let ViewRecipe = JSON.parse(localStorage.getItem("ViewRecipe"));
    let isedit = JSON.parse(localStorage.getItem("isedit"));
    if(ViewRecipe){
        title.innerText = "We’ve got the recipe just for you!";
        return
    }
    if(isedit){
        title.innerText = " Your Recipe Saved Successfully!";
        localStorage.setItem("isedit" , "false");
        return
    }
    if(!ViewRecipe){
        title.innerText = " Your Recipe Added Successfully!";
        return
    }
  
       
  
}



function create_card() {
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
    let RecipeDescription = WantedRecipe.description;
    let RecipeImage = WantedRecipe.image;
    recipe_name_display.innerText = RecipeName;
    course_display.innerText = RecipeCourse;
    description_display.innerText = RecipeDescription;
    display_recipe_image.style.backgroundImage = `url('${RecipeImage}')`;
}


change_title();
loadnav("recipes");
load_profile_pic();
create_card();


  

