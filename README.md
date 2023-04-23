# Virtual Pet Project

A web application created as a piece of coursework for my first year module Application Programming. I was tasked to create a virtual pet web application using everything I have learnt throughout the year.

## Features
* Pets stored in a database
* Pet stats will change even while the user isnt using the application

## Future Features
* Tutorial for new users
* Extra animal/ pet options
* Pet customisation e.g. different colours
* User lifetime statistics e.g. number of times they've fed a pet
* User authentication for each pet

## Client

* `index.html` is a simple landing page where the user can choose the pet they want or go to create a new one.
* `index.mjs` is a JS script that handles displaying all of the pets the player has in a select element.
* `create.html` is the page for the user to create any new pets.
* `create.mjs` this JS script handles adding any new pets to the database.
* `pet.html` displays the pet seleted by the user and allows the user to interact with them such as feeding and cleaning the pet.
* `pet.mjs` handles all of the pets stats and saving the pet to the database.

## Server/ Back-end

* `svr.mjs` static express server that handles all of the HTTP requests.
* `pets.sql` is an SQL script that creates the tables and database.
* `petAccess.js` handles all of the PostgreSQL queries and errors using the `pg` package.
* `config.js` states where to find the PostgreSQL and which database to use.


## Launch/ Setup
```
$ cd ../virtualpet
$ npm install
$ npm run setup
$ npm start
```

## Additional Notes
The dropdown menu in the pet page would be removed if this were to be released as an actual product, it is kept in for testing purposes. This is why it is excluded when using a screen with a width less than 450px as testing and development will be completed on a desktop meaning it is not required on a mobile device. 

The timer for the pets stats changing would also be adjusted for release from every 1 second to every 20 seconds while the user is using the application, the offline timer would also be changed so that the stats would go from 100 to 0 after 14 hours.
