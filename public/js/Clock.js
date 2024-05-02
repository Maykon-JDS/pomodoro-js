'use strict'; // Não sei o que faz

export default class Clock{

    constructor(){

        this.time = document.querySelector("#time input");

        this.player = document.querySelector("#play button");

        this.mode = document.querySelectorAll("#mode span");

        this.alarm = document.querySelector("#alarm audio")

        this.clockConfiger();

        this.workSec = "00";

        this.workMin = "00";

        this.workHour = "00";

        this.breakSec = "00";

        this.breakMin = "00";

        this.breakHour = "00";

    }

    setTime(){

        if(this.mode[0].classList.contains("active")){

            this.setWorkTime();

        }else{

            this.setBreakTime();

        }

    }

    setWorkTime(){

        let separateTimeData = this.time.value.split(':');

        this.workSec = separateTimeData[2];

        this.workMin = separateTimeData[1];

        this.workHour = separateTimeData[0];

    }

    setBreakTime(){

        let separateTimeData = this.time.value.split(':');

        this.breakSec = separateTimeData[2];

        this.breakMin = separateTimeData[1];

        this.breakHour = separateTimeData[0];

    }

    clockConfiger(){

        var self = this;

        this.player.addEventListener('click', function(){

            self.changeFunction();

        });

    }

    changeFunction(){

        if(document.querySelector("#play button.play")){

            this.activatePlayButton();

        }
        else if(document.querySelector("#play button.stop")){

            this.activateStopButton();

        }
        else if(document.querySelector("#play button.break")){

            this.activateBreakButton();

        }
        else if(document.querySelector("#play button.work")){

            this.activateWorkButton();

        }
        else{

            this.activateRestartButton();

        }

    }

    activateStopButton() {

        clearInterval(this.loop);

        this.player.classList.remove("stop");

        this.player.querySelector("span").innerHTML = "Restart";

        this.player.classList.add("restart");

    }

    activateRestartButton() {

        this.time.value = `${this.workHour}:${this.workHour}:${this.workHour}`;

        this.time.removeAttribute("readonly");

        this.player.classList.remove("restart");

        this.player.querySelector("span").innerHTML = "Start";

        this.player.classList.add("play");

    }

    activateBreakButton() {

        this.time.value = `${this.breakHour}:${this.breakMin}:${this.breakSec}`;

        this.time.removeAttribute("readonly");

        this.player.classList.remove("restart");

        this.player.querySelector("span").innerHTML = "Start";

        this.player.classList.add("play");

        this.player.classList.remove("break");

        this.mode[0].classList.toggle("active");

        this.mode[1].classList.toggle("active");

    }

    activateWorkButton() {

        this.time.value = `${this.workHour}:${this.workMin}:${this.workSec}`;

        this.time.removeAttribute("readonly");

        this.player.classList.remove("restart");

        this.player.querySelector("span").innerHTML = "Start";

        this.player.classList.add("play");

        this.player.classList.remove("work");

        this.mode[0].classList.toggle("active");

        this.mode[1].classList.toggle("active");

    }

    activatePlayButton(){

        this.setTime();

        let times;

        if(this.mode[0].classList.contains("active")){

            times = [this.workHour, this.workMin, this.workSec];

        }
        else{

            times = [this.breakHour, this.breakMin, this.breakSec];

        }

        this.calculateTime(times);



    }

    calculateTime(times){

        let currentData = new Date();

        let oneMilli = 1;

        let oneSecMilli = 1000 * oneMilli;

        let oneMinMilli = 60 * oneSecMilli;

        let oneHourMilli = 60 * oneMinMilli;

        let hourMilli = times[0] * oneHourMilli;

        let minMilli = times[1] * oneMinMilli;

        let secMilli = times[2] * oneSecMilli;

        let time =  hourMilli + minMilli + secMilli;

        let currentDataMilliseconds  = currentData.getTime() + time;

        var self = this;

        this.loop = setInterval(function(){

            self.timerLoop(currentDataMilliseconds);

        }, 10);

        this.player.classList.add("stop");

        this.player.querySelector("span").innerHTML = "Stop"

        this.player.classList.remove("play");

    }

    timerLoop(currentDataMilliseconds) {

        let realTimeDataObj = new Date();

        let realTimeDataObjMilliseconds = realTimeDataObj.getTime();

        let timer = new Date(currentDataMilliseconds - realTimeDataObjMilliseconds + 10800000);

        let stringTimer = timer.toLocaleTimeString();

        if (currentDataMilliseconds - realTimeDataObjMilliseconds < 0) {

            this.timeIsOver();

        } else {

            this.updateTime(stringTimer);

        }

    }

    updateTime(stringTimer) {

        this.time.value = stringTimer;

        this.time.setAttribute("readonly", "readonly");

    }

    timeIsOver() {

        clearInterval(this.loop);

        this.playSong();

        this.player.classList.remove("stop");

        this.time.removeAttribute("readonly");

        if(this.mode[1].classList.contains("active")){

            this.player.classList.remove("break");

            this.player.classList.add("work");

            this.player.querySelector("span").innerHTML = "Work";

        }
        else{

            this.player.classList.remove("work");

            this.player.classList.add("break");

            this.player.querySelector("span").innerHTML = "Break";

        }

    }

    playSong(){

        this.alarm.play();

    }

}
