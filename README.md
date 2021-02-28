# Hot Springs Simulator

|                                                                                 |                       |
| ------------------------------------------------------------------------------- | --------------------- |
| <img src=".github/assets/hot-spring.svg" width="100px" alt="grid screenshot" /> | Hot Springs Simulator |

---

[![license badge](https://img.shields.io/github/license/mi544/coding-exercise?style=for-the-badge)](https://choosealicense.com/licenses/mit/)
[![online status badge](https://img.shields.io/website?down_color=lightgrey&down_message=offline&style=for-the-badge&up_color=blue&up_message=online&url=https%3A%2F%2Fhot-springs.personal-projects.space%2F)](https://hot-springs.personal-projects.space/)

You can access the deployed version of Hot Springs Simulator here:  
[Hot Springs Simulator](https://hot-springs.personal-projects.space/)

## Table of Contents

- [Description](#Description)
- [Flow](#Flow)
- [Installation](#Installation)
- [Deploying](#Deploying)
- [Usage](#Usage)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [Questions](#Questions)
- [Authors](#Authors)

## Description

This is a Full-Stack (mainly Front-End) application that takes user input of dimensions (`height` and `width`) and renders a grid.

The user can then set `dig points` and `rocks points` to outline the starting points of hot springs.

With those points laid out on the grid, the user can press the `Let the water run` button to start a simulation of hot springs.

The water will be spreading to adjacent cells every second and in turn will be causing them to start spreading the water too.

Rocks points will remain untouched by the water. These points act as block points.

| ->                                             | ->                                             | ->                                             |
| ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| ![grid screenshot 1](.github/assets/grid1.png) | ![grid screenshot 2](.github/assets/grid2.png) | ![grid screenshot 3](.github/assets/grid3.png) |

---

## Flow

It is a Vue.js (v2) application that utilizes Vuex store extensively.

`App.vue` is the first component to load, and it mainly takes care of the routes, as well as information that should be displayed on all the pages.

All the logic happens inside of the `Grid.vue` and `HotSprings.vue` components. `HotSprings` takes user input (dimensions of the grid) and passes it to the Vuex store.

The `Grid` component renders the grid and allows to interact with it by clicking on the cells directly.
The user can choose which points should be hot spring starting points, and which points should be rocks.
So long as there's at least one hot spring starting point cell on the grid, the user can click the `Let the water run` button to start spreading the water.

Every `750ms` of the simulation equals to one day, and there's a date indicator to the right of the grid showing the exact day of the simulation starting from today.

The hot springs spread as far as they can taking all the cells not protected by rocks cells. When changes are no longer being made on the grid, the water stops and shows the result - the full date when the water from hot springs finished spreading.

The user can then reset the grid to delete all rocks and dig cells, or enter new values in the input fields to define new dimensions for the grid.

The main logic of the app is controller in the `Grid.vue` and `Vuex Store` files.

The main function that takes care of spreading the water to adjacent cells is located in `/src/utils/spreadWater.js`.
Its job is to confirm the possibility of spreading water in a specific direction passed in and spread the water or skip the turn if it is not possible.

## Installation

You need [Node.js](https://nodejs.org/en/) installed to run this app.

To install all the dependencies required to run this app, in the root folder run

```bash
npm install
```

In case of deploying on the server, additionally run

```bash
cd server && npm install
```

## Deploying

To deploy, assuming everything is installed, run the following commands on the server

```bash
cd server && node index.js
```

You can optionally pass in the `PORT` as an environment variable depending on the system.

The app is currently deployed to an EC2 AWS Instance with PM2 and Nginx serving as a reverse proxy, with both Nginx and PM2 being initialized on the startup to ensure consistent uptime.

## Usage

To open the development version of the app, run

```bash
npm run serve
```

Follow the instructions from the **About** page on how to proceed.

## Contributing

Pull requests for new features or bug fixes and issues related to those are very welcome!

## Tests

This application has very extensive Front-End tests.

To test the app, run

```bash
npm run test:unit
```

This will run the test suite and test the flow of all major components and functions.

When contributing, please make sure to add tests for new code.

## Questions

Reach out to me with any questions via email:  
sd32@pm.me

## Authors

Maksim Verkhoturov

# Attribution

- Hot spring icon made by [smalllikeart](https://flaticon.com/authors/smalllikeart) from [flaticon.com](https://flaticon.com/)
- Icons for cells made from the official [Steam screenshot](https://cdn.cloudflare.steamstatic.com/steam/apps/297000/ss_548367faf1cfa549c88585cb9b01f13b05b05ab7.1920x1080.jpg) of [Heroes® of Might & Magic® III - HD Edition](https://store.steampowered.com/app/297000/Heroes_of_Might__Magic_III__HD_Edition/) by Maksim Verkhoturov
