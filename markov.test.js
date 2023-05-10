"use strict";

let { MarkovMachine } = require("./markov");


describe("getChains function", function () {
  let string = "The cat in the hat.";
  let machine;
  let chainsMatcher;

  beforeEach(function () {
    machine = new MarkovMachine(string);
    chainsMatcher = {
      "The": ["cat"],
      "cat": ["in"],
      "in": ["the"],
      "the": ["hat."],
      "hat.": [null]
    };
  });

  test("should return an object", function () {
    const chainsObj = machine.getChains();
    expect(chainsObj).toEqual(expect.any(Object));
  });

  test("should return the cat in the hat object", function () {
    const chainsObj = machine.getChains();
    expect(chainsObj).toEqual(chainsMatcher);
  });
});

describe("getText function", function () {
  let string = "The cat in the hat.";
  let machine;
  let text;
  let textArray;

  beforeEach(function () {
    machine = new MarkovMachine(string);
    text = machine.getText();
    textArray = text.split(" ");
  });

  test("should return a string", function () {
    expect(text).toEqual(expect.any(String));
  });

  test("should start with the first word of the string", function () {
    expect(textArray[0]).toEqual("The");
  });

  test("should end with the last word of the string", function () {
    expect(textArray[textArray.length-1]).toEqual("hat.");
  });

});