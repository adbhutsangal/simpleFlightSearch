const flights = require('./flight-sample');

exports.searchFlight = (req, res) => {
    console.log(req.body);
    if (req.body.flightNo && req.body.date) {
        let index = flights.findIndex(ele => ele.flightNumber == req.body.flightNo);
        if (index > -1) {
            res.send([flights[index]]);
        } else {
            res.send(404)
        }
    } else if (req.body.origin && req.body.destination && req.body.date) {
        let result = [];
        flights.forEach(ele => {
            if (new RegExp(req.body.origin, 'i').test(ele.origin) && new RegExp(req.body.destination, 'i').test(ele.destination)) {
                result.push(ele)
            }
        });

        if (result.length > 0) {
            res.send(result)
        } else {
            res.send(404);
        }
    } else {
        res.status(201).send({message: 'Invalid search query'})
    }
};

