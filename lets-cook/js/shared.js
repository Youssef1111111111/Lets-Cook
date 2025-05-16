export function loadnav(page){
    let search_input;
    let search_bt;
    let search_result_tab;
    let search_tab;
    let is_admin = localStorage.getItem("is_admin")
    let nav = document.querySelector(".nav")

    if(!is_admin || is_admin == "") {
        return;
    }

    if(is_admin == "Admin"){
        nav.innerHTML = ` 
        <div class="logo">
            <h1 class="lets"> LET’S </h1>
            <h1 class="cook"> COOK </h1>
        </div>
        <div class="tabs">
            <a class="${page == "home" ? 'tab choosed_tab' : 'tab'}" id="home" href="./index.html">Home</a>
            <a class="${page == "recipes" ? 'tab choosed_tab' : 'tab'}" id="recipes" href="./Recipes.html">Recipes</a>
            <a class="${page == "myrecipes" ? 'tab choosed_tab' : 'tab'}" id="my_recipes" href="./MyRecipes.html">MyRecipes</a>
            <a class="${page == "add" ? 'tab choosed_tab' : 'tab'}" id="add_recipes" href="./AddProduct.html">Add Recipe</a>
            <a class="${page == "fav" ? 'tab choosed_tab' : 'tab'}" id="acc" href="./Favourites.html">Favourites</a>
            <a class="${page == "acc" ? 'tab choosed_tab' : 'tab'}" id="acc" href="./account.html">Account</a>
            <div class="search_box">
                <img src="./images/search.png"  class="search_icon">
                <div class="search_tab" id= "admin_search_tab">
                    <input type="text" class="search" placeholder="Search">
                    <div class="search_result_tab">
            
                    </div>
                </div>
            </div>
        </div>
        <div class="profile_image"> </div>
        `
    }
    else{
        nav.innerHTML = ` 
        <h1 class="logo" id="admin_logo"><span class="lets"> LET’S </span> <span class="cook"> COOK </span></h1>
        <div class="tabs">
            <a class="${page == "home" ? 'tab choosed_tab' : 'tab'}"  id="home" href="./index.html">Home</a>
            <a class="${page == "recipes" ? 'tab choosed_tab' : 'tab'}" id="recipes" href="./Recipes.html">Recipes</a>
            <a class="${page == "fav" ? 'tab choosed_tab' : 'tab'}" id="fav_recipes" href="./Favourites.html">Favourite Recipes</a>
            <a class="${page == "acc" ? 'tab choosed_tab' : 'tab'}" id="acc" href="./account.html">Account</a>
            <div class="search_box">
                <img src="./images/search.png"  class="search_icon">
                <div class="search_tab">
                    <input type="text" class="search" placeholder="Search">
                    <div class="search_result_tab">
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="profile_image"> </div>
        `  
    }

    search_bt = document.querySelector(".search_icon");
    search_tab = document.querySelector(".search_tab");
    search_input = document.querySelector(".search");
    search_result_tab = search_tab.querySelector(".search_result_tab");

    search_bt.addEventListener("click", function () {
        if (search_input.classList.contains("show_search_input")) {
            search_input.classList.remove("show_search_input");
            search_input.disabled = true; 
        } 
        else {
            search_input.classList.add("show_search_input");
            search_input.disabled = false; 
        }

        if (search_tab.classList.contains("show_search_tab")) {
            search_tab.classList.remove("show_search_tab");
        } 
        else {
            search_tab.classList.add("show_search_tab");
        }
    });

    const searchInput = document.querySelector(".search");
    searchInput.addEventListener("input", () => {
        search_result_tab.innerHTML = "";
        const searchValue = searchInput.value.trim().toLowerCase(); 
        if (searchValue === "") return;
        let Recipes = JSON.parse(localStorage.getItem("Recipes")); 
        Recipes.forEach(recipe => {
          const recipeName = recipe.Name.toLowerCase();
          const IngredintsArray = recipe.ingredients;
          
          let ingredientsNames = [];
    
          for(let i = 0 ; i < IngredintsArray.length ; i++){
            ingredientsNames.push(IngredintsArray[i].IngredientName)
          }
          
          if (recipeName.startsWith(searchValue) || ingredientsNames.includes(searchValue) ) {
            let search_result = document.createElement("div")
            search_result.classList.add("search_result");
            search_result.dataset.recipe_id = recipe.RecipeId;
            let line = document.createElement("hr")
            line.classList.add("line")
            search_result.innerHTML = `
            <h1 class="search_name"> ${recipe.Name}  </h1>
            <h1 class="search_course"> ${recipe.Course} </h1>`
            search_result_tab.append(line);
            search_result_tab.append(search_result)
            search_result.addEventListener("click",function(){
                let cuurent_recipe_id = search_result.dataset.recipe_id;
                localStorage.setItem("CurrentRecipeId",cuurent_recipe_id);
                localStorage.setItem("ViewRecipe",true);
                window.location.href = "Success_add.html";

            })
          }
        });
      });
 
}

export function check_fav(e,type){
    e.target.setAttribute("src","./images/favourite(2).png")
    let currentid = e.target.closest(type).dataset.recipe_id;
    let user_fav = JSON.parse(localStorage.getItem('UserFavourites'));
    if(user_fav.includes(currentid)){
       e.target.setAttribute("src","./images/favourite.png")
       user_fav = removeItem(user_fav,currentid);
    }
    else{
        user_fav.push(currentid);
    }
    localStorage.setItem('UserFavourites', JSON.stringify(user_fav));
}

export function learn_more(e,type){
    let currentid = e.target.closest(type).dataset.recipe_id;
    localStorage.setItem("CurrentRecipeId", currentid);
    localStorage.setItem("ViewRecipe",true);
}


function removeItem(arr,value) {
    arr = arr.filter(item => item !== value);
    return arr;
}


export function load_profile_pic(){
    let savedImage = localStorage.getItem("profileImage");
    let profile_image = document.querySelector(".profile_image")
    if(savedImage){
        profile_image.style.backgroundImage = `url('${savedImage}')`;
    }
    profile_image.addEventListener("click",function(){
        window.location.href = "account.html"
    });
}