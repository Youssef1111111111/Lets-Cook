let signup_bt = document.querySelector(".signup_bt") 
let is_admin = document.querySelector("#agreeCheckbox")
let inputs = document.querySelectorAll(".input")
let titles = document.querySelectorAll(".title")
let error_messages = document.querySelectorAll(".error-message")

function singup(){
    if(validate_input()){
        localStorage.setItem("username" , inputs[0].value)
        localStorage.setItem("email" , inputs[1].value)
        localStorage.setItem("password" , inputs[2].value)
        if(is_admin.checked){
            localStorage.setItem("is_admin","Admin")
            window.location.href="index.html"
            
        }
        else{
            localStorage.setItem("is_admin","User")
            window.location.href="index.html"
        }
    }  
}

function validate_input(){
    valid = true;
    for(let i = 0 ; i < 4 ; i++){
        if(i == 1){
            if(!isValidEmail(inputs[i].value)){
                valid = false;
                error_messages[0].classList.remove("none")
            }
            else{
                error_messages[0].classList.add("none")
            }
        }
        if(!validate_password(inputs[2].value , inputs[3].value)){
            valid = false;
            error_messages[1].classList.remove("none") 
        }
        else{
            error_messages[1].classList.add("none")
        }

        if(inputs[i].value == "" || (i==1 && !isValidEmail(inputs[i].value)) ){
            valid = false;
            inputs[i].classList.add("error-border")
            titles[i].classList.add("error-title")
        }
        else{
            inputs[i].classList.remove("error-border")
            titles[i].classList.remove("error-title")
        }
    }
    return valid
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validate_password(pass , confirmpass){
    if(pass=="" || confirmpass==""){
        return true
    }
    if(pass != "" && confirmpass != "" ){
        return pass === confirmpass
    }
}




signup_bt.addEventListener("click", singup)