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
          assert.deepEqual(res.body, expectedTraveller, 'right')
          assert.equal(res.status, 200)
          done();
        });
    });
    // #4
    test('send {surname: "da Verrazzano"}', function (done) {
      assert.fail();

      done();
    });
  });
});

const Browser = require("zombie");

suite("Functional Tests with Zombie.js", function () {

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('submit "surname" : "Colombo" - write your e2e test...', function (done) {
      browser.fill("surname", "Colombo").pressButton("submit", function () {
        assert.fail();

        done();
      });
    });
    // #6
    test('submit "surname" : "Vespucci" - write your e2e test...', function (done) {
      assert.fail();

      done();
    });
  });
});
