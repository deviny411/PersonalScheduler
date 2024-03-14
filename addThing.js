
const hours = document.getElementById("hours-box");
const minutes = document.getElementById("minutes-box");
const textbox = document.getElementById("textbox");
const dateInput= document.getElementById("dateInput");


taskName.innerHTML = "Task: " + localStorage.getItem("AddThingTitle");

let taskTimes = new Object();
let dueDates = new Object();
let taskDescriptions = new Object();
if(JSON.parse(localStorage.getItem("taskTimes")) !== null){
    taskTimes =JSON.parse(localStorage.getItem("taskTimes"));
    console.log("works1");
}
if(JSON.parse(localStorage.getItem("dueDates")) !== null){
    dueDates =JSON.parse(localStorage.getItem("dueDates"));
    console.log("works1");
}



function setTime(){
    let today = new Date();
    let dueD= dateInput.value;
  
   console.log(dateInput.value);
    if( hours.value=='' && minutes.value==''){
        alert("Please enter time!");
        hours.value = "";
        minutes.value ="";
    }
    else if(isNaN(hours.value) || isNaN(minutes.value)){
        alert("Please enter integers!");
        hours.value = "";
        minutes.value ="";
    }
    else if(parseInt(hours.value) == 0 && parseInt(minutes.value) == 0){
        alert("Please input a time greater than 0!");
        hours.value = "";
        minutes.value ="";
    }
    else if(dateInput.value == ""){

        alert("Please set a due date");
    }
    else{
        let name=localStorage.getItem("AddThingTitle");
        
        taskTimes[name] = hours.value*60*60+ minutes.value*60;
        if(textbox.value == undefined){
            taskDescriptions[name] = "";
        }
        else{
         taskDescriptions[name] = textbox.value;
        }
        localStorage.setItem("taskTimes", JSON.stringify(taskTimes));
        localStorage.setItem("taskDescriptions", JSON.stringify(taskDescriptions));
        
        let tasks =JSON.parse(localStorage.getItem("taskTimes"));
      
      
        dueDates[name] = dueD;
        localStorage.setItem("dueDates", JSON.stringify(dueDates));
        
        window.location.href = "home.html";
s
    }
}

