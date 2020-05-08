# Siiliwall
The Siili Wall project is a simplified Kanban-board in which the user can create columns for stickies on a board. The stickies represent tasks and can be moved between columns by dragging and dropping. The goal of this project is to make a lightweight app which can be set up in no time by creating the required agile workspace without excessive configurations.

The project is now set up for continuation for a future project group.

## What next ->
The aim is to start working with multiple boards. Currenlty we only have one board that has been under focus.
 - Backlog is located in Trello that is provided by Siili where you can continue working.

## Tech
Node v12.41.1
React 16.12

## Installation
Install correct Node.js -version which would be 12.14.1 LTS, https://nodejs.org/en/
Make sure you are using 16.12 version of React.js, https://reactjs.org/versions

git clone <insert url here> to clone siili_wall from repository
cd siiliwall_front to move into a correct directory
git checkout to a desired branch
npm install to apply libraries used in project (there's going to be quite a bit of downloadable material)
npm start to start up the app

## Features

#### react-beautiful-dnd
is used in this project to provide core structure we needed to drag 'n' drop stickers between columns. This package will be included in npm install but should you need to separately install the package, use npm i react-beautiful-dnd. Further reading and documentation about rbd in: [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd)

#### MaterialUI
React UI framework. In this project Material-UI is used for buttons and text fields.

#### React UseReducer
UseReducer in use because of Hooks applied in code instead of Classes. It allows functional components in React access to reducer functions from your state management.

### Extra
Routing added to continue working with boards and BoardForm for some idea testings.

## Web hosting
We are using [Netlify](https://www.netlify.com/) to host our web project. Netlify is everything you need to build fast, modern websites: continuous deployment, serverless functions, and so much more. We decided to use this one beacause the setup is well documented and 

### Continous deployment with Netlify
Create production build with `${npm run build}`. 

Connect your Github to Netlify and follow instructions at [Deploy with Git](https://docs.netlify.com/site-deploys/create-deploys/#deploy-with-git)

#### Manual deployment
`${npm install netlify-cli -g}`Downloads all packages needed
`${netlify deploy}` we can access netlify commands and start configuring your site. Point deploy path to ./build and follow instructions.

# Attention!
While using Netlify we cannot fetch/push to our backend in Heroku because it's not using https protection. To work around that we need to remove https access to netlify from browser settings. Following instructions are for Chrome.

Connect to <app name>.netlify.com

1. Press symbol that looks like a small lock in the browser search bar.
2. Press site settings and you should be on privacy and security tab if not press it.
3. Scroll down to "insecure content" and set dropdown menu to "allow".

## Tests
Development branch has cypress tests provided by Siili.