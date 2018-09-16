# Uni-oth_mensa_api

This node application is a wrapper around the inofficial API for different canteens of the university (and university of applied sciences) in Regensburg, germany.  

The original API is kind of unhandy, as it serves its weekly data in the `csv` format. To improve the handling for more simple applications, this wrapper allows more routes and serves its data in the `json` format.

The following canteens are supported:

- OTH
- OTH evening / abends
- University (Sammelgebäude)
- Prüfening

## Paths

Public API paths:

    /mensa/:location/:day

Possible location values:

    uni, oth, oth-abend, pruefening

Possible day values:

    mo, di, mi, do, fr, sa, so

## Usage

Get menu for the university canteen of this weeks monday:

    /mensa/uni/mo

## Build

Pull required dependencies:

    $ npm install

## Run

Start the application:

    $ npm run start

Example execution:

```bash
$ npm run start

> uni-oth_mensa_api@1.0.0 start /Users/lukas/Git/Untracked/Javascript/uni-oth_mensa_api
> nodemon lib/server.js

[nodemon] 1.18.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node lib/server.js`

Updating local cache
Uni-oth_mensa_api started on port: 3000
Try http://localhost:3000/mensa/uni/mo
```

## Response

Example response for path `/mensa/uni/mo`:

```json
[{
    "name": "Feine Kräutersuppe",
    "date": "10.09.2018",
    "day": "mo",
    "category": "Suppe",
    "labels": ["V"],
    "details": ["3", "A", "G", "I", "AA"],
    "price": {
        "students": "0,70",
        "employees": "0,90",
        "guests": "1,40"
    }
}, {
    "name": "Hähnchenbrustfilet mit Pfefferrahm und Minirösti",
    "date": "10.09.2018",
    "day": "mo",
    "category": "HG3",
    "labels": ["G"],
    "details": ["3", "A", "G", "AA"],
    "price": {
        "students": "3,10",
        "employees": "3,90",
        "guests": "4,60"
    }
}, {
    "name": "Bio-Fusilli",
    "date": "10.09.2018",
    "day": "mo",
    "category": "B1",
    "labels": ["B", "VG"],
    "details": ["A", "AA"],
    "price": {
        "students": "0,80",
        "employees": "1,00",
        "guests": "1,50"
    }
}]
```

## Credits

This application is heavily inspired by @alexanderbazo's [URMensa-JSON-API](https://github.com/alexanderbazo/URMensa-JSON-API) project.