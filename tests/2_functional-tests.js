const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .get("/hello")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });
    // #2
    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .get("/hello?name=kalebe")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello kalebe");
          done();
        });
    });
    // #3
    test('send {surname: "Colombo"}', function (done) {
      const req = {
        surname: 'Colombo'
      }

      const expectedTraveller = {
        name: 'Cristoforo',
        surname: 'Colombo',
        dates: '1451 - 1506'
      }

      chai
        .request(server)
        .put("/travellers")
        .send(req)
        .end(function (err, res) {
          // console.log(res.text)
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Cristoforo');
          assert.equal(res.body.surname, 'Colombo');
          done();
        });
    });
    // #4
    test('send {surname: "da Verrazzano"}', function (done) {
      const req = {
        surname: 'da Verrazzano'
      }

      chai
        .request(server)
        .put('/travellers')
        .send(req)
        .end((err, res) => {
          assert.equal(res.status, 200)
          assert.equal(res.type, 'application/json')
          assert.equal(res.body.name, 'Giovanni')
          assert.equal(res.body.surname, 'da Verrazzano')
          done();
        }) 
    });
  });
});

const Browser = require("zombie");
Browser.site = 'https://boilerplate-mochachai.kalebelopes.repl.co'
const { application } = require("express");
const { json } = require("body-parser");

suite("Functional Tests with Zombie.js", function () {
  const browser = new Browser();

  suiteSetup(function(done) { 
    return browser.visit('/', done)
  })
  
  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('submit "surname" : "Colombo" - write your e2e test...', function (done) {
      browser
        .fill('surname', 'Colombo')
      
      browser
        .pressButton("submit", function () {
          browser.assert.success()
          browser.assert.text('span#name', 'Cristoforo')
          browser.assert.text('span#surname', 'Colombo')
          browser.assert.element('span#dates', 1)
          done();
      });
    });
    // #6
    test('submit "surname" : "Vespucci" - write your e2e test...', function (done) {
      browser
        .fill('surname', 'Vespucci')
      
      browser
        .pressButton('submit', () => {
          browser.assert.success()
          browser.assert.text('span#name', 'Amerigo')
          browser.assert.text('span#surname', 'Vespucci')
          browser.assert.element('span#dates', 1)
        })

      done();
    });
  });
});
