const clockContainer = document.querySelector(".js-clock"),
     clockTitle = clockContainer.querySelector("h1");

function getTime() {
    let date = new Date(),
     hours = date.getHours(),
     minutes = date.getMinutes(),
     seconds = date.getSeconds(),
     day_night = "AM";

     if(hours > 12){
        day_night = "PM";
        hours = hours - 12;
      }
    
     hours = hours < 10 ? `0${hours}` : hours;
     minutes = minutes < 10 ? `0${minutes}`: minutes;
     seconds = seconds < 10 ? `0${seconds}` : seconds;
    
     clockTitle.innerText = `${hours}:${minutes}:${seconds}  ${day_night}`;
}

function init(){
    getTime();
    setInterval(getTime, 500)
}

init(); 