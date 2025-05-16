import {loadnav , load_profile_pic , check_fav , learn_more} from "./shared.js";
let is_admin = localStorage.getItem("is_admin")
let getstart = document.querySelector("#getstart")
let empty_text = document.querySelectorAll(".empty")
let Recipes = JSON.parse(localStorage.getItem("Recipes")); 
let popular_section = document.querySelector(".popular_section")
let latest_section = document.querySelector(".latest_section")
let storedValue = localStorage.getItem('UserFavourites');
let ViewRecipe = localStorage.getItem('ViewRecipe');

if (!Recipes || Recipes === "null" || Recipes === "undefined" || Recipes === "0") {
    localStorage.setItem('Recipes', JSON.stringify([]));
}


if (!storedValue || storedValue === "null" || storedValue === "undefined" || storedValue === "0") {
    localStorage.setItem('UserFavourites', JSON.stringify([]));
}

if(!ViewRecipe || ViewRecipe === "null" || ViewRecipe === "undefined" || ViewRecipe === "0"){
    localStorage.setItem('ViewRecipe', JSON.stringify(true));
}



function HomeReload(){
    if(!is_admin || is_admin == "") {
        getstart.classList.remove("none")
    }
    else{
        getstart.classList.add("none")
    }
    
    loadnav("home");
    if(Recipes.length >= 3){
        let index_arr = [];
        while(index_arr.length != 3){
            let index = getRandomNumber(Recipes.length-1);
            if(index_arr.includes(index)){
                continue;
            }
            else{
                index_arr.push(index)
            }
        }
        for(let i = 0 ; i < 3 ; i++){
            CreatePopularCard(index_arr[i]);
        }
        let counter = 1;
        for(let i = 0 ; i < 3 ; i++){
            CreateLatestCard(counter);
            counter++;
        }

    }
    else if (Recipes.length == 0){
        if(!is_admin || is_admin == ""){
            empty_text[0].innerText = "There's nothing here yet, but sign up now to start adding your own recipes!"
            empty_text[1].innerText = "There's nothing here yet, but sign up now to start adding your own recipes!"
        }

        else if(is_admin == "Admin"){
            empty_text[0].innerText = "Let’s get cooking! Add your first recipe and share your flavor with the world."
            empty_text[1].innerText = "Let’s get cooking! Add your first recipe and share your flavor with the world."
        }
        else{
            empty_text[0].innerText = "Thanks for stopping by again! We're still cooking things up—check back soon for our first delicious recipes!"
            empty_text[1].innerText = "Thanks for stopping by again! We're still cooking things up—check back soon for our first delicious recipes!"
        }
    }

    else{
        let index_arr = [];
        while(index_arr.length != Recipes.length){
            let index = getRandomNumber(Recipes.length-1);
            if(index_arr.includes(index)){
                continue;
            }
            else{
                index_arr.push(index)
            }
        }
        for(let i = 0 ; i < Recipes.length ; i++){
            CreatePopularCard(index_arr[i]);
        }
        let counter = 1;
        for(let i = 0 ; i < Recipes.length ; i++){
            CreateLatestCard(counter);
            counter++;
        }

    }
    load_profile_pic();

}

function CreatePopularCard(index_arr){
    let recipe = Recipes[index_arr];
    let recipe_name = recipe.Name
    let recipe_course = recipe.Course;
    let recipe_disc = recipe.description;
    let recipe_image = recipe.image;
    let popular_card = document.createElement("div");
    let recipe_id = recipe.RecipeId
    popular_card.classList.add("popular_card")
    popular_card.dataset.recipe_id = recipe.RecipeId;
    let user_fav_arr = JSON.parse(localStorage.getItem('UserFavourites'));
    popular_card.innerHTML = `
        <div class="card_recipe_image"></div>
        <div class="card_text_box">
            <h3 class="card_course"> ${recipe_course} </h3>
            <img src="./images/favourite.png" alt="" class="Favourite_recipe_home">
            <h1 class="card_recipe_name"> ${recipe_name} </h1>
            <p class="card_par"> ${recipe_disc}</p>
            <a href="./Success_add.html" class="learn_more card_par"> learn More </a>
        </div>`
    let card_image = popular_card.querySelector(".card_recipe_image")
    card_image.style.backgroundImage = `url('${recipe_image || "./images/b170870007dfa419295d949814474ab2_t.jpeg"}')`;

    let learn_more_bt = popular_card.querySelector(".learn_more");
    learn_more_bt.addEventListener("click", function(){learn_more(event,".popular_card")})

    let fav_bt = popular_card.querySelector(".Favourite_recipe_home");
    if(user_fav_arr.includes(String(recipe_id)) && (is_admin == "User" || is_admin == "Admin" ) ){
        fav_bt.setAttribute("src","./images/favourite(2).png")
    }
    fav_bt.addEventListener("click", function(){check_fav(event,".popular_card")});

    popular_section.append(popular_card);
}

function CreateLatestCard(counter){
    let recipe = Recipes[Recipes.length - counter];
    let recipe_name = recipe.Name
    let recipe_course = recipe.Course;
    let recipe_disc = recipe.description;
    let recipe_image = recipe.image;
    let recipe_id = recipe.RecipeId
    let latest_card = document.createElement("div");
    latest_card.classList.add("latest_card")
    latest_card.dataset.recipe_id = recipe.RecipeId;
    let user_fav_arr = JSON.parse(localStorage.getItem('UserFavourites'));
    latest_card.innerHTML = `
        <div class="card_recipe_image"></div>
        <div class="card_text_box">
            <h3 class="card_course"> ${recipe_course} </h3>
            <img src="./images/favourite.png" alt="" class="Favourite_recipe_home">
            <h1 class="card_recipe_name"> ${recipe_name} </h1>
            <p class="card_par"> ${recipe_disc} </p>
            <a href="./Success_add.html" class="learn_more card_par"> learn More </a>
        </div>`
    let card_image = latest_card.querySelector(".card_recipe_image")
    card_image.style.backgroundImage = `url('${recipe_image || "./images/b170870007dfa419295d949814474ab2_t.jpeg"}')`;

    let fav_bt = latest_card.querySelector(".Favourite_recipe_home");
    if(user_fav_arr.includes(String(recipe_id)) && (is_admin == "User" || is_admin == "Admin" ) ){
        fav_bt.setAttribute("src","./images/favourite(2).png")
    }
    fav_bt.addEventListener("click", function(){check_fav(event,".latest_card")})

    let learn_more_bt = latest_card.querySelector(".learn_more");
    learn_more_bt.addEventListener("click", function(){learn_more(event,".latest_card")})
    latest_section.append(latest_card);
}

function getRandomNumber(n) {
    return Math.floor(Math.random() * (n + 1));
}


window.onload = HomeReload;