/**
 * @jest-environment jsdom
 */

const Clock = require("../../../public/js/Clock");

const HTMLMediaElementTestSupport = require("./config/js/HTMLMediaElementTestSupport");

const fs = require("fs");

describe("Clock", () => {


  try {

  var html = new DOMParser().parseFromString(fs.readFileSync("index.html", "utf8"), "text/html");

  } catch (error) {

    teste = 1;
    
  }


  var a = html.querySelectorAll("script");

  a.forEach((e) => {

    e.remove();

  });

  document.body.innerHTML = html.body.innerHTML;

  const clock = new Clock();

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

  test("test clockConfiger()", () => {


    expect(clock.player.getE).toBe("23")

  });

});
