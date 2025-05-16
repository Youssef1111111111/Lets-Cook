import { loadnav } from "./shared.js";
let input_img  = document.querySelector(".input_img")
let profile_pic = document.querySelector(".profile_pic")
let data_boxes = document.querySelectorAll(".data_box")
let edits = document.querySelectorAll(".edit_icon")
let save = document.querySelectorAll(".save_bt")
let logout_bt = document.querySelector(".logout_icon")

input_img.addEventListener("change", function(event) {
    const file = event.target.files[0]; 
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            profile_pic.style.backgroundImage = `url('${imageUrl}')`;
            localStorage.setItem("profileImage" , imageUrl )

        };
        reader.readAsDataURL(file); 
    }
    
});



function loadProfile(){
    let username = localStorage.getItem("username")
    let email = localStorage.getItem("email")
    let acc_status = localStorage.getItem("is_admin")
    let savedImage = localStorage.getItem("profileImage");
    data_boxes[0].placeholder = username;
    data_boxes[1].placeholder = email;
    data_boxes[3].placeholder = acc_status;
    loadnav("acc");
    let profile_image = document.querySelector(".profile_image")
    if(savedImage){
        profile_pic.style.backgroundImage = `url('${savedImage}')`;
        profile_image.style.backgroundImage = `url('${savedImage}')`;
    }
    
    
}



for(let i = 0 ; i < 2 ; i++){
    edits[i].addEventListener("click",function(e){
        e.target.classList.add("none")
        data_boxes[i].disabled = false;
        save[i].classList.remove("none")
    })
}

for(let i = 0 ; i < 2 ; i++){
    save[i].addEventListener("click",function(e){
        edits[i].classList.remove("none")
        save[i].classList.add("none")
        data_boxes[i].disabled = true;
        if(i == 0){
            if(!data_boxes[0].value) return
            localStorage.setItem("username" , data_boxes[0].value)
            data_boxes[0].placeholder = data_boxes[0].value;
        }
        else{
            if(!data_boxes[1].value) return
            localStorage.setItem("email" , data_boxes[1].value)
            data_boxes[1].placeholder = data_boxes[1].value;
        }
        setTimeout(() => {
            location.reload();
        }, 100);

    })
}

function logout(){
    localStorage.removeItem("profileImage");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("is_admin");
    window.location.href = "index.html"
}


logout_bt.addEventListener("click" , logout);

loadProfile();



 
