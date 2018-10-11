# rgb-mensa_api

[![npm @latest](https://img.shields.io/npm/v/rgb-mensa_api.svg)](https://www.npmjs.com/package/rgb-mensa_api)
[![dependencies Status](https://david-dm.org/dotWee/rgb-mensa_api/status.svg)](https://david-dm.org/dotWee/rgb-mensa_api)
[![devDependencies Status](https://david-dm.org/dotWee/rgb-mensa_api/dev-status.svg)](https://david-dm.org/dotWee/rgb-mensa_api?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/dotWee/rgb-mensa_api.svg)](https://github.com/dotWee/rgb-mensa_api/issues)
[![GitHub license](https://img.shields.io/github/license/dotWee/rgb-mensa_api.svg)](https://github.com/dotWee/rgb-mensa_api)

This node application is a json-wrapper around the inofficial API for different canteens of the university (and university of applied sciences) in Regensburg, germany.  

The original API is kind of unhandy, as it serves its weekly data in the **csv** format. To improve the handling for more simple applications, this wrapper allows more routes and serves its data in the **json** format.

The following canteens are supported:

- OTH
- OTH evening / abends
- University (Sammelgebäude)
- Prüfening

## Build

Pull required dependencies:

    $ npm install

## Run

Start the application:

    $ npm run start

Example execution:

```bash
$ npm run start

> rgb-mensa_api@1.1.0 start .
> node lib/server.js

Updating local cache
Uni-oth_mensa_api started on port: 3000
Try http://localhost:3000/mensa/uni/mo
```

## Usage

### Whole menu for current week

    /mensa/:location

Possible location values:

    uni
    oth
    oth-evening
    pruefening

### Menu for specific weekday

    /mensa/:location/:day

Possible location values:

    uni
    oth
    oth-evening
    pruefening

Possible day values:

    monday
    tuesday
    wednesday
    thursday
    friday
    saturday
    sunday
    today

#### Example

Get menu for the university canteen of this weeks monday:

    GET /mensa/uni/monday

```json
[
    {
        "name": "Broccolicremesuppe",
        "day": "monday",
        "category": "Suppe",
        "labels": [
            "V"
        ],
        "ingredients": [
            {
                "key": "3",
                "value": "mit Antioxidationsmittel"
            },
        ],
        "price":{
            "students": "0,70",
            "employees": "0,90",
            "guests": "1,40"
        }
    }, ...
]
```

## Credits

This application is heavily inspired by @alexanderbazo's [URMensa-JSON-API](https://github.com/alexanderbazo/URMensa-JSON-API) project.

## License

Copyright (c) 2018 Lukas Wolfsteiner

Licensed under the [_Do What The Fuck You Want To_](/LICENSE) public license