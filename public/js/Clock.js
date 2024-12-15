"use strict"; // Não sei o que faz

export default class Clock {
  workSec = "00";

  workMin = "00";

  workHour = "00";

  breakSec = "00";

  breakMin = "00";

  breakHour = "00";

  totalWorkTime = 0;

  totalBreakTime = 0;

  constructor() {
    this.time = document.querySelector("#time input");

    this.player = document.querySelector("#play button");

    this.mode = document.querySelectorAll("#mode span");

    this.alarm = document.querySelector("#alarm audio");

    this.totalWorkTimerElement = document.querySelector("#work-time .time");

    this.totalBreakTimerElement = document.querySelector("#break-time .time");

    this.clockConfiger();
  }

  setTime() {
    if (this.mode[0].classList.contains("active")) {
      this.setWorkTime();
    } else {
      this.setBreakTime();
    }
  }

  setWorkTime() {
    let separateTimeData = this.time.value.split(":");

    this.workSec = separateTimeData[2];

    this.workMin = separateTimeData[1];

    this.workHour = separateTimeData[0];
  }

  setBreakTime() {
    let separateTimeData = this.time.value.split(":");

    this.breakSec = separateTimeData[2];

    this.breakMin = separateTimeData[1];

    this.breakHour = separateTimeData[0];
  }

  clockConfiger() {
    var self = this;

    this.player.addEventListener("click", function () {
      self.changeFunction();
    });
  }

  changeFunction() {
    if (document.querySelector("#play button.play")) {
      this.activatePlayButton();
    } else if (document.querySelector("#play button.stop")) {
      this.activateStopButton();
    } else if (document.querySelector("#play button.break")) {
      this.activateBreakButton();
    } else if (document.querySelector("#play button.work")) {
      this.activateWorkButton();
    } else {
      this.activateRestartButton();
    }
  }

  activateStopButton() {
    clearInterval(this.loop);

    clearInterval(this.loop2);

    this.player.classList.remove("stop");

    this.player.querySelector("span").innerHTML = "Restart";

    this.player.classList.add("restart");
  }

  activateRestartButton() {
    this.time.value = `${this.workHour}:${this.workMin}:${this.workSec}`;

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

  activatePlayButton() {
    this.setTime();

    let times;

    if (this.mode[0].classList.contains("active")) {
      times = [this.workHour, this.workMin, this.workSec];
    } else {
      times = [this.breakHour, this.breakMin, this.breakSec];
    }

    this.addTotalTime();

    let time = this.calculateTime(times);

    var self = this;

    //TODO: Criar um a função para pegar os segundos da data atual

    let currentData = new Date();

    let currentDataMilliseconds = currentData.getTime() + time;

    this.loop = setInterval(function () {
      self.timerLoop(currentDataMilliseconds);
    }, 10);

    this.player.classList.add("stop");

    this.player.querySelector("span").innerHTML = "Stop";

    this.player.classList.remove("play");
  }

  calculateTime(times) {
    let oneMilli = 1;

    let oneSecMilli = 1000 * oneMilli;

    let oneMinMilli = 60 * oneSecMilli;

    let oneHourMilli = 60 * oneMinMilli;

    let hourMilli = times[0] * oneHourMilli;

    let minMilli = times[1] * oneMinMilli;

    let secMilli = times[2] * oneSecMilli;

    return hourMilli + minMilli + secMilli;
  }

  timerLoop(currentDataMilliseconds) {
    let realTimeDataObj = new Date();

    let realTimeDataObjMilliseconds = realTimeDataObj.getTime();

    let timer = new Date(
      currentDataMilliseconds - realTimeDataObjMilliseconds + 10800000
    );

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

    clearInterval(this.loop2);

    this.playSong();

    this.player.classList.remove("stop");

    this.time.removeAttribute("readonly");

    if (this.mode[1].classList.contains("active")) {
      this.player.classList.remove("break");

      this.player.classList.add("work");

      this.player.querySelector("span").innerHTML = "Work";
    } else {
      this.player.classList.remove("work");

      this.player.classList.add("break");

      this.player.querySelector("span").innerHTML = "Break";
    }
  }

  playSong() {
    this.alarm.play();
  }

  async addTotalTime() {
    let realTimeDataObj2 = new Date();

    let self = this;

    if (this.mode[0].classList.contains("active")) {
      let times = [this.workHour, this.workMin, this.workSec];

      this.loop2 = setInterval(function () {
        console.log(this.totalWorkTime);

        let realTimeDataObj = new Date();

        let realTimeDataObjMilliseconds =
          realTimeDataObj.getTime() - realTimeDataObj2.getTime();

        let timer = new Date(
          realTimeDataObjMilliseconds + 10800000 + self.totalWorkTime
        );

        self.totalWorkTimerElement.innerText = timer.toLocaleTimeString();
      }, 10);

      let time = this.calculateTime(times);

      this.totalWorkTime += time;

      console.log(this.totalWorkTime);
    } else {
      let times = [this.breakHour, this.breakMin, this.breakSec];

      this.loop2 = setInterval(function () {
        let realTimeDataObj = new Date();

        let realTimeDataObjMilliseconds =
          realTimeDataObj.getTime() - realTimeDataObj2.getTime();

        let timer = new Date(
          realTimeDataObjMilliseconds + 10800000 + self.totalBreakTime
        );

        self.totalBreakTimerElement.innerText = timer.toLocaleTimeString();
      }, 10);


      let time = this.calculateTime(times);

      this.totalBreakTime += time;

      console.log(this.totalBreakTime);
    }
  }

}
