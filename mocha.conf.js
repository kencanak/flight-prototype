'use strict';

// Register the Babel require hook
require('babel-core/register');

//load all the services
// Loads the module we want to test
global.Airports = require('./client/components/services/airports.service');

var chai = require('chai');
global.mochaPhantomJS = require('mocha-phantomjs-core');

// Load Chai assertions
global.expect = chai.expect;
global.assert = chai.assert;
chai.should();

// Load Sinon
global.sinon = require('sinon');

// Initialize Chai plugins
chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));
chai.use(require('chai-things'))