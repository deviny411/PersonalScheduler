let popup = document.getElementById("popup");
let editTitle =localStorage.getItem("EditTitle");
let taskTimes = JSON.parse(localStorage.getItem("taskTimes"));// dict
let taskDescriptions = JSON.parse(localStorage.getItem("taskDescriptions"));
let description = document.getElementById("description");
let timeLeft = taskTimes[editTitle]; // gets the time
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let started = false;
let title = document.getElementById("taskName");
let dueDates= JSON.parse(localStorage.getItem("dueDates"));
let dateDisplay = document.getElementById("dueDate");


let dueD = new Date(`${dueDates[editTitle]}T23:59`).getTime();
dateDisplay.innerHTML = dueDates[editTitle];
title.innerHTML = "Task: " + localStorage.getItem("EditTitle");
console.log(timeLeft);
hours.innerHTML = Math.floor(timeLeft/3600);
hours.innerHTML = hours.innerHTML <10 ? '0' +hours.innerHTML:hours.innerHTML;
document.getElementById("hoursDisplay").innerHTML = hours.innerHTML;
minutes.innerHTML = Math.floor((timeLeft%3600)/60);
minutes.innerHTML = minutes.innerHTML <10 ? '0' +minutes.innerHTML:minutes.innerHTML;
document.getElementById("minutesDisplay").innerHTML = minutes.innerHTML;



seconds.innerHTML = timeLeft%60;
seconds.innerHTML = seconds.innerHTML <10 ? '0' +seconds.innerHTML:seconds.innerHTML;

description.innerHTML = taskDescriptions[localStorage.getItem("EditTitle")];
let button = document.getElementById("beginTimer");
function openPopup(){
    popup.classList.add("open-popup");
    if(button.innerHTML== "Stop"){
        button.innerHTML = "Start";
        button.classList.toggle("clicked");
    }
}

function deleteTask(){
    localStorage.setItem("delete", true);
    var arr = [editTitle];
    localStorage.setItem("deleteName", JSON.stringify(arr));
    window.location.href= "home.html";

}

let y = null;
function closePopup(){
    taskTimes[editTitle] = timeLeft;
    localStorage.setItem("taskTimes", JSON.stringify(taskTimes));
    popup.classList.remove("open-popup");
    clearInterval(y);
    document.getElementById("hoursDisplay").innerHTML = hours.innerHTML;
    document.getElementById("minutesDisplay").innerHTML = minutes.innerHTML;

}




popup.addEventListener("click", function(e){
    console.log(timeLeft);
    if(e.target.className.indexOf('beginTimer') >-1){
        let x = e.target;
        
        if(x.innerHTML=="Start"){
         
           if(timeLeft <=0){
                alert("Timer expired");
           } else{
            x.innerHTML="Pause";
          
         
            y = setInterval(updateCountdown, 1000);
            e.target.classList.toggle("clicked");
            }
        }
        else{
            
            e.target.classList.toggle("clicked");
            x.innerHTML="Start";
            clearInterval(y);
        }
        
           
       
        
 
    }
}, false);



function updateCountdown(){
   
    if(timeLeft <=0){
        seconds.innerHTML = "00";
        alert("Timer expired");
        clearInterval(y);
        button.classList.toggle("clicked");
        button.innerHTML = "Start";
        return;
   }
   
   timeLeft--;
    hours.innerHTML = Math.floor(timeLeft/3600);
    hours.innerHTML = hours.innerHTML <10 ? '0' +hours.innerHTML:hours.innerHTML;
    minutes.innerHTML = Math.floor((timeLeft%3600)/60);
    minutes.innerHTML = minutes.innerHTML <10 ? '0' +minutes.innerHTML:minutes.innerHTML;

    seconds.innerHTML = timeLeft%60;
    seconds.innerHTML = seconds.innerHTML <10 ? '0' +seconds.innerHTML:seconds.innerHTML;
   
  
    
}