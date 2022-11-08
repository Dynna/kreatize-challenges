// require express and create instance of it
const express = require('express');
// create instance of LCM function which finds least common multiple for an array of integer numbers
const lcm = require( 'compute-lcm' );

const app = express();

const PORT = 8080;

// get request with hallo message on root address localhost:8080
app.get('/', function (req, res) {
    res.status(200).send('Hallo :) Here is my Express HTTP server running successfully.');
});

// create get route which computes LCM from query params
app.get('/lcm', (req, res) => {
    // here we have objects
    var arrOfQueryParams = req.query;

    // get only values from key objects
    const paramsToNumbers = Object.values(arrOfQueryParams).map(str => {
        return Number(str);
    });

    // check if request receives less than two params and display a corresponding message
    if(paramsToNumbers.length < 2) {
        res.status(422).send("At least two natural numbers must be provided to compute the LCM.")
    }

    try {
        // assign LCM computation of given parameters to a variable
        var computedLcm = lcm( paramsToNumbers ); 
        // display message with input values and LCM result 
        res.status(200).send('The LCM of ' + Object.values(arrOfQueryParams) + ' is ' + computedLcm);

    } catch (error) {
        var errMessage = error.message;

        // check if at least one of the parameters is not natural number and display a corresponding message
        if(errMessage.includes("Accessed array values must be integers")) {
            res.status(422).send("Only natural numbers may be used to calculate a LCM.")
        }
    }
});

// start the server on port 8080
app.listen(PORT, function () {
    console.log(`Server running at: http://localhost:${PORT}/`);
});

module.exports = app;