# Northcoders News API Server #

<p align="center">
  <img title="NC News" width="380" alt="NC News" src="https://github.com/husainbismil/ncnews-server/blob/main/u_logo.png?raw=true">
</p>

NCNews-Server is a back-end server application that is designed to serve API requests, which are responsible for displaying requested content and allowing controlled user manipulation of data via its React.js based NCNews-WebApp front-end. 

This API allows users of the WebApp to view and interact with the ElephantSQL hosted PostgreSQL database by simply interacting with user interface elements on the front-end, which runs in the internet browser on the clients device, and from there sends HTTP requests to preset API endpoints on the NC News API Server . The NC News API Server can also be alternatively put into use by sending HTTP requests directly to it without the use of a front end, for example through a tool such as Insomnia, an API Testing Tool, or your own application.

These two apps were developed as part of my Northcoders Portfolio using the Object Oriented Programming programming paradigm, Model View Controller software architechtural pattern, Test Driven Software Development via Jest, along with Agile project management techniques such as Kanban (Trello) as part of their 13-week Software Development bootcamp: www.northcoders.com. 

If you would like to host your own NC-News Server, please follow these instructions. 

  <img align="right" title="NC News" width="200" alt="NC News" src="https://github.com/husainbismil/ncnews-server/blob/main/btn_veps.png?raw=true">

## First Steps

Before anything, you can fork, clone, or download this repo. 

See here for help: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository

The repo files should be in a folder named 'ncnews-server'.
 
 
## Setting up your .env files

Next, you need to set up your 'dotenv' files. 

*"Dotenv files are used to load environment variables from a . env file into the running process. This file may expose sensitive information that could help a malicious user to prepare more advanced attacks."*

Step 1) Create a file in the root /ncnews-server/ folder, named '.env.development', without the quotes.

Step 2) Open the 'env.development' file, for example using any text editor like Notepad (Windows) or Gedit (Ubuntu Gnome). Copy the following code, paste it into the file, then save it. 

```js
PGDATABASE=nc_news
```

Step 3) Create a file in the root /ncnews-server/ folder, named '.env.test', without the quotes.

Step 4) Open the 'env.test' file using any text editor. Copy the following code, paste it into the file, then save it. 

```js
PGDATABASE=nc_news_test
```

Step 5) Finally, you should adjust the permissions of the two newly created .env files, so that when you host them, they cannot be accessed by the public. To do this, from your root /ncnews-server/ directory where the .env files are located, run the two following terminal commands:

```js
sudo chmod 440 .env.development
sudo chmod 440 .env.test
```

## Installing required dependencies

First, you need to install nodejs, and the nodejs package manager (npm).

For linux (ubuntu/debian), use these instructions to do that, located under the heading "Install Node.js and npm from the Ubuntu repository": https://linuxize.com/post/how-to-install-node-js-on-ubuntu-20-04/

For Windows, use these instructions: [windows instructions]

For WSL, use these instructions: [wsl instructions]

For Mac OSX, use these instructions: [mac osx instructions]

Once nodeJS is verified as installed, you can proceed to the next steps below. 

Next, you need to make sure you have the required npm (node package manager) packages installed for the application to function correctly. 

Step 5) Open a terminal instance and navigate to your /ncnews-server/ folder.

Step 6) Copy in the following line and press enter:

```js
npm install
```

Assuming no errors are encountered, proceed to the next step. 

  <img align="right" title="NC News" width="200" alt="NC News" src="https://github.com/husainbismil/ncnews-server/blob/main/btn_veps.png?raw=true">



## Under Construction

Please note this readme file is under construction and is not yet complete.


## Original Repo

https://github.com/husainbismil/ncnews-server

https://github.com/northcoders/be-nc-news






