class Clock{

    constructor(){

        this.time = document.querySelector("#time input");

        this.player = document.querySelector("#play button");

        this.mode = document.querySelector("#mode span");

        this.clockConfiger();

    }

    setTime(){

        let separateTimeData = this.time.value.split(':');

        this.sec = separateTimeData[2];

        this.min = separateTimeData[1];

        this.hour = separateTimeData[0];

    }


    clockConfiger(){

        var self = this;

        this.player.addEventListener('click', function(){

            self.changeFunction();

        } );
        
    }


    changeFunction(){

        if(document.querySelector("#play button.play")){

            this.activatePlayButton();

        }
        else if(document.querySelector("#play button.stop")){

            this.activateStopButton();

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

        this.time.value = `${this.hour}:${this.min}:${this.sec}`;

        this.time.removeAttribute("readonly");

        this.player.classList.remove("restart");

        this.player.querySelector("span").innerHTML = "Start";

        this.player.classList.add("play");

    }

    activatePlayButton(){

        this.setTime();

        this.timerLoop(this);

    }

    timerLoop(self){

        let currentData = new Date();

        let time =  this.hour * 60 * 60 * 1000 + this.min * 60 * 1000 + this.sec * 1000

        let currentDataMilliseconds  = currentData.getTime() + time;

        this.loop = setInterval(function(){

            let realTimeDataObj = new Date();
            
            let realTimeDataObjMilliseconds = realTimeDataObj.getTime();

            let timer = new Date(currentDataMilliseconds - realTimeDataObjMilliseconds + 10800000);
            
            let stringTimer = timer.toLocaleTimeString();

            if(currentDataMilliseconds - realTimeDataObjMilliseconds < 0){

                clearInterval(self.loop);

                self.playSong();

                self.player.classList.remove("stop");

                self.time.removeAttribute("readonly");

                self.player.querySelector("span").innerHTML = "Break";

                self.player.classList.add("break");

                self.mode.textContent = "Break";

            }else{

                self.time.value = stringTimer;

                self.time.setAttribute("readonly", "readonly");

            }

        }, 10);

        self.player.classList.add("stop");

        self.player.querySelector("span").innerHTML = "Stop"
        
        self.player.classList.remove("play");
    
    }

    playSong(){

        let audio = document.querySelector("#alarm audio")

        audio.play();

    }

}

