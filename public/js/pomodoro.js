class Clock{

    constructor(){

        this.time = document.querySelector("#time input");

        this.player = document.querySelector("#play button");

        this.mode = document.querySelector("#mode span");

    }

    setTime(){

        this.hour = 

        this.sec = arrayTime[2];

        this.min = arrayTime[1];

        this.hour = arrayTime[0]

    }

    timerLoop(self){

        let currentData = new Date();

    //Refactoring

        let arrayTime = self.time.value.split(':');

        ;

        let time =  strHour * 60 * 60 * 1000 + strMin * 60 * 1000 + strSec * 1000

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

    playTimer() {

        var self = this;

        this.player.addEventListener('click', function(){

            if(document.querySelector("#play button.play")){

                self.loopFunction(self);

            }
            else if(document.querySelector("#play button.stop")){

                clearInterval(self.loop);

                self.time.removeAttribute("readonly");

                self.player.classList.remove("stop");

                self.player.querySelector("span").innerHTML = "Restart"

                self.player.classList.add("restart");

            }
            else{

                self.time.value = "00:00:10"

                self.player.classList.remove("restart");

                self.player.querySelector("span").innerHTML = "Start"

                self.player.classList.add("play");

            }

        });
        
    }

    playSong(){

        let audio = document.querySelector("#alarm audio")

        audio.play();

    }

}

