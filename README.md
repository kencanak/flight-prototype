# flightapp-prototype

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.7.5.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

### Running the app

1. As mentioned above, run `npm install` `bower install` `gulp build` `gulp serve`

### Components

1. Angular-material: All of the search toolbox form component is using angular-material directive, I found the UX from this directive is great
2. momentjs: Just my most reliable anything related to date parsing and what not

### Test Data

1. I have created 2 dummy test data, both of them are located at "client/assets/dummy-data" directory
    * airports.json - contains the list of destinations
    * trips.json - contains the list of the available trip, as of now, I only generates flight data up to '28 Oct 2016'. I hope it's enough for testing

2. Should you need to re-generate the sample data, I have created a python script located at the `root/dummy-data-scripts/generate_random_trip.py`
    * you can change the date range or any other thing like adding pricings option, etc. To change the date, go to line `15 & 16`
    * once done, save it, open your console at the directory and type `python generate_random_trip.py'
    * it will overwrite the file located at "client/assets/dummy-data"

### Styling and making in responsive

1. for the form elements, since I am using angular-material, there is no changes being done. I like angular material design and the UX, hence i picked this directive
2. mobile layout styling was not done by using any CSS framework
3. I prefer nested styling way, I think it's easier for me to debug as it will be isolated from the top to bottom approach. of course too much nested, will make it very specific and not re-usable
3. As for the file structure, I will cover it in a bit

### File structure

1. First of all, I love this scaffolding boilerplate. I like the structure
2. How the files being structured
    * main view is located add "clients/app/main"
    * base SCSS like variables, mixins, typography, layout are located att "clients/assets/scss-lib
    * components like "search" and "results" are located at "clients/components". Each component's SCSS file is located in the respective sub-directory
    * service factory for data feed is located at "clients/components" as well, it contains 2 services, one for the airport codes, and one is for the trips
