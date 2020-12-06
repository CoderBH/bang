const form = document.querySelector(".inputForm");
const inputForm = form.querySelector("input");
const pendingUl = document.querySelector(".js-pending");
const finishedUl = document.querySelector(".js-finished");
 


function PenDelHandler(event){
    const btn = event.target;
    const li = btn.parentNode;
    pendingUl.removeChild(li);
    const cleanToDos = pendObj.filter(function(toDo){
        return toDo.id !== parseInt(li.id);  
    })   
    pendObj = cleanToDos; 
    saveVal();
}
function FinDelHandler(event){
    
    const btn = event.target;
    const li = btn.parentNode;
    finishedUl.removeChild(li);
    
    const cleanToDos = finObj.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    })
    finObj = cleanToDos; 
    
    finSaveVal();
}

let pendObj =[];
let finObj=[];

function paintVal(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const penBtn = document.createElement("button");
    const span = document.createElement("span");
    const pendId = pendObj.length +1;

    delBtn.innerText = "❌"; 
    penBtn.innerText = "⭕";
    span.innerText = text;

    delBtn.addEventListener("click",PenDelHandler);
    penBtn.addEventListener("click",paintFin);
    
        li.appendChild(span);
       
        li.appendChild(delBtn);
        li.appendChild(penBtn);
        li.id = pendId;
        pendingUl.appendChild(li);

        const newObj ={
            text : text, 
            id : pendId
        };
        pendObj.push(newObj);
        saveVal();
    }
function paintFin(event){
    
    const text1 = event.target;
    const text2 = text1.parentNode;
    const text3 = text2.querySelector("span");
    const text = text3.innerText;
   
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const rewindBtn = document.createElement("button");
    const span = document.createElement("span");
    const finId = finObj.length +1;

    delBtn.innerText = "❌"; 
    rewindBtn.innerText = "⏮";
    span.innerText = text;

    delBtn.addEventListener("click",FinDelHandler);
    rewindBtn.addEventListener("click",rewindPaint);
    
        li.appendChild(span);
        li.appendChild(delBtn);
        li.appendChild(rewindBtn);
        li.id = finId;
        finishedUl.appendChild(li);

        const newObj ={
            text : text, 
            id : finId
        };
        finObj.push(newObj);
        finSaveVal();
        PenDelHandler(event);
        
    
} 
function rewindPaint(event){
    
    const text1 = event.target;
    const text2 = text1.parentNode;
    const text3 = text2.querySelector("span");
    const text = text3.innerText;
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const penBtn = document.createElement("button");
    const span = document.createElement("span");
    const pendId = pendObj.length +1;

    delBtn.innerText = "❌"; 
    penBtn.innerText = "⭕";
    span.innerText = text;

    delBtn.addEventListener("click",PenDelHandler);
    penBtn.addEventListener("click",paintFin);
    
        li.appendChild(span);
        li.appendChild(delBtn);
        li.appendChild(penBtn);
     
        li.id = pendId;
        pendingUl.appendChild(li);

        const newObj ={
            text : text, 
            id : pendId
        };
        pendObj.push(newObj);
        saveVal();
        FinDelHandler(event);
        
        
}
function saveVal(){
    localStorage.setItem("Pending",JSON.stringify(pendObj));
}
function finSaveVal(){
    localStorage.setItem("Finished",JSON.stringify(finObj));
}

function handleSub(event){
    event.preventDefault();
    const currentVal = inputForm.value;
    paintVal(currentVal);
    inputForm.value ="";
}

function loadToDos(){
    const loadedToPen = localStorage.getItem("Pending");
    if(loadedToPen !== null){
        const parsedToPen = JSON.parse(loadedToPen);
        parsedToPen.forEach(function (toDo){
           paintVal(toDo.text);
        })                   
    }
    const loadedToFin = localStorage.getItem("Finished");
    if(loadedToFin !== null){
        const parsedToFin = JSON.parse(loadedToFin);
        parsedToFin.forEach(function (toDo){
            loadFin(toDo.text);
        })
    }
}
function loadFin(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const rewindBtn = document.createElement("button");
    const span = document.createElement("span");
    const finId = finObj.length +1;

    delBtn.innerText = "❌"; 
    rewindBtn.innerText = "⏮";
    span.innerText = text;

    delBtn.addEventListener("click",FinDelHandler);
    rewindBtn.addEventListener("click",rewindPaint);
    
        li.appendChild(span);
        li.appendChild(delBtn);
        li.appendChild(rewindBtn);
        li.id = finId;
        finishedUl.appendChild(li);

        const newObj ={
            text : text, 
            id : finId
        };
        finObj.push(newObj);
        finSaveVal();
}



function init(){
    loadToDos();
    form.addEventListener("submit",handleSub);
}
init();
