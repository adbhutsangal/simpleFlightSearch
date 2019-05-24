const searchController = require('./flight-docs/search.controller');
const express = require('express'),
    parser = require('body-parser'),
    httpLogger = require('morgan'),
    cors = require("cors");

class FlightSearchApp{

    constructor(){
        this.app = express();
    }

    createRoutes(){
        this.assignMiddleWares();
        this.app.use('/', express.static('public'));
        this.app.post('/api/search', searchController.searchFlight)
    }

    assignMiddleWares(){
        this.app.use(httpLogger('dev'));
        this.app.use(cors());
        this.app.use(parser.json({limit: '999mb', parameterLimit: 99999}));
    }

    startServer(){
        this.createRoutes();
        this.app.listen(9093 ,()=>{
            console.log('Server Started' , 9093)
        })
    }
}


new FlightSearchApp().startServer();
