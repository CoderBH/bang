const grForm = document.querySelector(".js-form"),
      input = grForm.querySelector("input"),
      greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_ON = "showing";

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);  
    
}
function saveName(text){
    localStorage.setItem(USER_LS,text);  
}


function askForName(){
    grForm.classList.add(SHOWING_ON);
    grForm.addEventListener("submit",handleSubmit);
}


function paintGreeting(text){
    grForm.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}


function init(){
    loadName(); 
}
init();  