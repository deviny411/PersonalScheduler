let dueDates= JSON.parse(localStorage.getItem("dueDates"));

let keys = Object.keys(dueDates);
let today = new Date();

// let daysTilDue = new Object();
let taskTimes = JSON.parse(localStorage.getItem("taskTimes"));// dict

let computations = new Array(keys.length);

let index = 0;
let button = document.getElementById("beginTimer");



let taskDescriptions = JSON.parse(localStorage.getItem("taskDescriptions"));
let description = document.getElementById("description");
let taskName= document.getElementById("task");
let currentTask = generateComputations();

description.innerHTML= taskDescriptions[currentTask];
taskName.innerHTML = currentTask;
let minutes = document.getElementById("minutes");
    let seconds = document.getElementById("seconds");

let timeLeft = 100;
if(taskTimes[currentTask] > 30*60){
    timeLeft= 30*60;
}
else{
    timeLeft = taskTimes[currentTask];
}
displayTime();
let y= null;

document.addEventListener("click", function(e){
    console.log(timeLeft);
    if(e.target.className.indexOf('beginTimer') >-1){
        let x = button;
        
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

function generateComputations(){
    keys.forEach(key => {
        let dueD = new Date(`${dueDates[key]}T23:59`);
        let timeTilDue = dueD.getTime()- today.getTime();
        let daysTilDue= Math.floor(timeTilDue / (1000 * 60 * 60 * 24));
      
        let hoursLeft = (taskTimes[key] % (60 * 60 * 24)) / (60 * 60);
        console.log(hoursLeft);
    
        computations[index] = new Array(2);
        computations[index][1]= key;
        if(daysTilDue>0){
           
            computations[index][0] = hoursLeft/(daysTilDue);
            console.log(daysTilDue +" " + hoursLeft +"\n");
            
        }
        else if(daysTilDue==0){
            computations[index][0] = 20+hoursLeft/(daysTilDue+1);
        }
        else{
            computations[index][0] = 40+hoursLeft*-daysTilDue;
        }
        index += 1;
    }
    );
    
    computations.sort();
    computations.reverse();
    return computations[0][1];
}
function displayTime(){
    
    minutes.innerHTML = Math.floor((timeLeft%3600)/60);
    minutes.innerHTML = minutes.innerHTML <10 ? '0' +minutes.innerHTML:minutes.innerHTML;
    seconds.innerHTML = timeLeft%60;
    seconds.innerHTML = seconds.innerHTML <10 ? '0' +seconds.innerHTML:seconds.innerHTML;
}
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
    minutes.innerHTML = Math.floor((timeLeft%3600)/60);
    minutes.innerHTML = minutes.innerHTML <10 ? '0' +minutes.innerHTML:minutes.innerHTML;

    seconds.innerHTML = timeLeft%60;
    seconds.innerHTML = seconds.innerHTML <10 ? '0' +seconds.innerHTML:seconds.innerHTML;
}


function FinishPopup(){
    
    let x = document.getElementById("popupFinish");
    let h = document.getElementById("popupBg");
    h.classList.toggle("visible");
    x.classList.toggle("visible");
    
}

function finishTask(){

    localStorage.setItem("delete",true);
    console.log(currentTask);
    delete taskDescriptions[currentTask];
    delete dueDates[currentTask];
    delete taskTimes[currentTask];
    var arr =  JSON.parse(localStorage.getItem("deleteName"));
    arr.push(currentTask);
    localStorage.setItem("deleteName", JSON.stringify(arr));
    saveData();
    FinishPopup();
    clearInterval(y);
    startBreak();
}


function startBreak(){
    taskName.innerHTML = "Break";
    timeLeft = 15*60;
    minutes.innerHTML = Math.floor((timeLeft%3600)/60);
    minutes.innerHTML = minutes.innerHTML <10 ? '0' +minutes.innerHTML:minutes.innerHTML;
    seconds.innerHTML = timeLeft%60;
    seconds.innerHTML = seconds.innerHTML <10 ? '0' +seconds.innerHTML:seconds.innerHTML;
    button.className =  "beginTimer";
    button.innerHTML = "Start";
    y= null;
    currentTask = generateComputations();

}
function saveData(){
    localStorage.setItem("taskDescriptions", JSON.stringify(taskDescriptions));
    localStorage.setItem("dueDates", JSON.stringify(dueDates));
    localStorage.setItem("taskTimes", JSON.stringify(taskTimes));
}

