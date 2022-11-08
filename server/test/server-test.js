const app_server = require("../server")
const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", app_server);


test("server main route", done => {
    request(app)
      .get("/")
      .expect("Content-Type", String)
      .expect('Hallo :) Here is my Express HTTP server running successfully.')
      .expect(200, done);
  });

  test("server LCM route for two natural numbers", done => {
    request(app)
      .get("/lcm?a=4&b=10")
      .expect("Content-Type", String)
      .expect('The LCM of 4,10 is 20')
      .expect(200, done);
  });  

  test("server LCM route for not natural numbers", done => {
    request(app)
      .get("/lcm?a=4.2&b=10")
      .expect("Content-Type", String)
      .expect('Only natural numbers may be used to calculate a LCM.')
      .expect(422, done);
  }); 
  
  test("server LCM route for only one number", done => {
    request(app)
      .get("/lcm?a=4")
      .expect("Content-Type", String)
      .expect('At least two natural numbers must be provided to compute the LCM.')
      .expect(422, done);
  }); 