# Mwenbwa

> A web-based game of conquests… and trees

***

## Heroku Link

[https://mwenbwa.herokuapp.com/](https://mwenbwa.herokuapp.com/)

## Contributors
- [Guillaume Boeur](https://github.com/Guillaume-Boeur)
- [Arnaud Magonette](https://github.com/arnaudmagonette)
- [Alan Louette](https://github.com/AlanLouette)
- [Thomas Dussart](https://github.com/thomasdussart)

***

## Introduction

Based on [external data](https://data.gov.be/en/node/48556), we created a WebApp consisting of a REST-like API (back-end) and a React SPA (front-end). This WebApp will consist be an online [IDLE Game](https://en.wikipedia.org/wiki/Incremental_game), based in Liège.

## Mwenbwa - game rules

In a map of Liège, there is trees. Each tree as a _value_ (which is the product of his _diameter_ by his _height_, *rounded to top*). 

> This value will use the "leaf" as unit.

When a player enter the game, he needs to create an account, choose a color, and receive three random, *free* tree and some bonus leaves.  
Every fifteen minutes **in real life**, each player receive an amount of leaves equals to the total of each of his trees.  
Every hour **in real life**, each player loose half his leaves.

Whenever he wants, a player can _buy_ a tree. 

- If the tree is *free*, the _value_ of the tree is its price. When a player buy a *free tree*, a **random name** is affected to that tree.
- If the tree belongs to another player, the price is computed with a formula.

Whenever he wants, a player can *lock* a tree by paying an expensive somme: A *locked tree* can't be buy by another player.

At anytime, a player can check the **leaderboard**, to see each player score, amount of trees, etc.  
At anytime, a player can consult the **gamelog**, which record all actions in the game.

When clicking on a tree, a player can see its value, name, owner, history of buys, and a link to the relative wikipedia article for this tree's species (if applicable).Any player can also leave a **comment** on a tree.

***

## Implementation

### Data

These data came from the [Belgium OpenData Initiative website](https://data.gov.be).
Convert and store into a **MongoDB** database.

### Interactive map

[OpenStreetMap](https://www.openstreetmap.org/) is used with [Leaflet](https://leafletjs.com/).

### Mockup & Design

First mockup with [JustInMind](https://www.justinmind.com/)

### Technical Stack

#### Back-end

A `REST-like API` using:

- **[Node.JS](https://nodejs.org/en/)**
- **[MongoDB](https://www.mongodb.com/)**

#### Front-end

A `Single Page App` using:

- **[React](https://reactjs.org/)**
- **[Leaflet](https://leafletjs.com/)**

### Toolchain / Dev Env

#### Environment

**Back-end** part be compiled with [BabelJS](https://babeljs.io).

**Front-end** part be compiled/packaged with [Webpack](https://webpack.js.org/).

#### Prettier & ESLint

The project is configured to use  [Prettier](https://prettier.io) & [ESLint](https://eslint.org).


#### Hooks git

The project is also configured with a *hook* de **precommit** for git

#### Deployment

The application is deployed on [**Heroku**](https://www.heroku.com) and it is working with [**mLab**](https://mlab.com) for the Database .

* * *