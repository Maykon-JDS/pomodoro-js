/**
 * @jest-environment jsdom
 */

import {expect, jest, test} from '@jest/globals';

import { assert } from "console";

// const Clock = require("../../../public/js/Clock");

import Clock from '../../../public/js/Clock';

import HTMLMediaElementTestSupport from "./config/js/HTMLMediaElementTestSupport";

import fs from "fs";

import { resolve } from "path";

import { rejects } from "assert";

function htmlE(){

  try {

    var html = new DOMParser().parseFromString(fs.readFileSync("index.html", "utf8"), "text/html");

    } catch (error) {

      teste = 1;

    }


    var a = html.querySelectorAll("script");

    a.forEach((e) => {

      e.remove();

    });

    return html

}

describe("Clock", () => {

  document.body.innerHTML = htmlE().body.innerHTML;

  var clock = new Clock();

  test("test constructor()", () => {

    expect(clock.time.constructor.name).toBe("HTMLInputElement")

    expect(clock.player.constructor.name).toBe("HTMLButtonElement")

    expect(clock.mode.constructor.name).toBe("NodeList")

    expect(clock.alarm.constructor.name).toBe("HTMLAudioElement")

    expect(clock.workSec).toBe("00")

    expect(clock.workMin).toBe("00")

    expect(clock.workHour).toBe("00")

    expect(clock.breakSec).toBe("00")

    expect(clock.breakMin).toBe("00")

    expect(clock.breakHour).toBe("00")

  });


  test("test playing playSong()", () => {

    clock.playSong()

    expect(!clock.alarm.paused).toBe(true)

    clock.alarm.pause();

  });

  test("test paused playSong()", () => {

    expect(clock.alarm.paused).toBe(true)

  });

  test("test default setWorkTime()", () => {

    clock.setWorkTime();

    expect(clock.workSec).toBe("00")

    expect(clock.workMin).toBe("00")

    expect(clock.workHour).toBe("00")

  });

  test("test 23:59:59 setWorkTime()", () => {

    let time = document.querySelector("#time input");

    time.value = "23:59:59";

    clock.setWorkTime();

    expect(clock.workSec).toBe("59");

    expect(clock.workMin).toBe("59");

    expect(clock.workHour).toBe("23");

    time.value = "00:00:00";

  });

  test("test default setBreakTime()", () => {

    clock.setBreakTime();

    expect(clock.breakSec).toBe("00")

    expect(clock.breakMin).toBe("00")

    expect(clock.breakHour).toBe("00")

  });

  test("test 23:59:59 setBreakTime()", () => {

    let time = document.querySelector("#time input");

    time.value = "23:59:59";

    clock.setBreakTime();

    expect(clock.breakSec).toBe("59")

    expect(clock.breakMin).toBe("59")

    expect(clock.breakHour).toBe("23")

    time.value = "00:00:00";

  });

  test("test clockConfiger() was called", () => {

    let spy = jest.spyOn(Clock.prototype, 'clockConfiger');

    let clock = new Clock();

    expect(spy).toHaveBeenCalled();

    // unnecessary in this case, putting it here just to illustrate how to "unmock" a method
    spy.mockRestore();
  });

  test("test changeFunction() was called", () => {

    let spy = jest.spyOn(Clock.prototype, 'changeFunction');

    let clock = new Clock();

    clock.player.click();

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();

  });

  test("test activatePlayButton() was called", () => {

    let spy = jest.spyOn(Clock.prototype, 'activatePlayButton');

    let clock = new Clock();

    expect(clock.player.classList.contains("play")).toBeTruthy()

    clock.player.click();

    expect(spy).toHaveBeenCalled();

    // unnecessary in this case, putting it here just to illustrate how to "unmock" a method
    spy.mockRestore();

  });

  test("test activateStopButton() was called", () => {

    document.body.innerHTML = htmlE().body.innerHTML;

    let spy = jest.spyOn(Clock.prototype, 'activateStopButton');

    let clock = new Clock();

    clock.player.click();

    expect(clock.player.classList.contains("stop")).toBeTruthy();

    clock.player.click();

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();

  });

  test("activateRestartButton() was called", () => {

    document.body.innerHTML = htmlE().body.innerHTML;

    let spy = jest.spyOn(Clock.prototype, 'activateRestartButton');

    let clock = new Clock();

    clock.player.click();

    clock.player.click();

    expect(clock.player.classList.contains("restart")).toBeTruthy();

    clock.player.click();

    expect(spy).toHaveBeenCalled();

    spy.mockRestore();

  });

  test("activateBreakButton() was called with work time 0 seconds", () => {

    document.body.innerHTML = htmlE().body.innerHTML;

    let spy = jest.spyOn(Clock.prototype, 'activateBreakButton');

    let clock = new Clock();

    let time = document.querySelector("#time input");

    time.value = "00:00:00";

    clock.player.click();

    function fetchData(){

      return new Promise((resolve, reject) => {

        setTimeout(() => {

          clock.player.click();

          resolve()

        }, 20)

      })

    }

    return fetchData().then(data => {

      expect(spy).toHaveBeenCalled();

    });

  });

  test("activateBreakButton() was called with work time 2 seconds", () => {

    document.body.innerHTML = htmlE().body.innerHTML;

    let spy = jest.spyOn(Clock.prototype, 'activateBreakButton');

    let clock = new Clock();

    let time = document.querySelector("#time input");

    time.value = "00:00:02";

    clock.player.click();

    function fetchData(){

      return new Promise((resolve, reject) => {

        setTimeout(() => {

          clock.player.click();

          resolve()

        }, 2500)

      })

    }

    return fetchData().then(data => {

      expect(spy).toHaveBeenCalled();

    });

  });

  test("activateWorkButton() was called", () => {

  });


});
