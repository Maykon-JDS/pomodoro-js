/**
 * @jest-environment jsdom
 */

describe("Clock", () => {

  test("defines setRule()", () => {

    const fs = require("fs");

    var teste;

    try {
    
      var data = fs.readFileSync("index.html", "utf8");

      document.body.innerHTML = data;

      teste = data;
      
    } catch (error) {

      teste = 1;

    }

    expect(document.body.innerHTML).toBeNull();

  });

});
