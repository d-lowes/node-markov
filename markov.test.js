"use strict";

let { MarkovMachine } = require("./markov");

describe("getChains function", function () {
  let string = "The hat is a cat.";
  let machine;

  beforeEach(function () {
    machine = new MarkovMachine(string);
  });

  test("should return an object", function () {
    const chainsObj = machine.getChains();
    expect(chainsObj).any(Object);
  });
});