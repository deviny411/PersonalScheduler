
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskName = document.getElementById("taskName");
const addButton = document.getElementById("addButton");

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let elements = Array.from(document.getElementsByTagName("li"));
        let liNames=  new Array(elements.length);
        for (let index = 0; index < elements.length; index++) {
            let temp =elements[index].innerHTML
     
            liNames[index] = temp.substring(0, temp.length - 1-30);
            console.log(liNames[index]);
            
        }
       if(liNames.includes(inputBox.value)){
        alert("You already have this task. You can edit the task by clicking on it");
       }
       else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.id=inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "&#8942";
        span.classList.add("dropdown");
        li.appendChild(span); 
        let temp = document.getElementsByClassName("dropdown");
        console.log(temp);
        localStorage.setItem("AddThingTitle", inputBox.value);
        window.location.href = "addThing.html";
        }
    }
    inputBox.value = "";
    saveData();
}


listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.className.indexOf('dropdown') >-1){
        let x=  e.target.parentElement.innerHTML;
        x = x.substring(0, x.length - 1-30);
        localStorage.setItem("EditTitle", x);
 
        window.location.href = "edit.html";
        saveData();
    }
}, false);

document.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        addTask();
    }
});


function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();



if(localStorage.getItem("delete") == "true"){
   
    let arr = JSON.parse(localStorage.getItem("deleteName"));
    let dueDates= JSON.parse(localStorage.getItem("dueDates"));
    let taskTimes = JSON.parse(localStorage.getItem("taskTimes"));// dict
    
    for(let i=0; i<arr.length; i++){
        var deleteID = arr[i];
        if(document.getElementById(deleteID)!= null){
        listContainer.removeChild(document.getElementById(deleteID));
        if(dueDates[deleteID]!=null){
            delete dueDates[deleteID];
        }
        if(taskTimes[deleteID]!= null){
            delete taskTimes[deleteID];
        }
      
        }
    }
    let temp = [];
    localStorage.setItem("deleteName",JSON.stringify(temp));
    localStorage.setItem("delete",false);
    saveData();


   
    localStorage.setItem("taskTimes", JSON.stringify(taskTimes));
    localStorage.setItem("dueDates", JSON.stringify(dueDates));
}
