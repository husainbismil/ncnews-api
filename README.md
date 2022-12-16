# Northcoders News API Server #

<p align="center">
  <img title="NC News" width="300" alt="NC News" src="https://github.com/husainbismil/ncnews-server/blob/main/n_logo.png?raw=true">
</p>


Welcome to the NC-News Server repo, part of my Northcoders portfolio project and designed to work with the react based front-end web app 'NC News'. This repository includes the NC-News server files, which need to be hosted somewhere and running for the NC-News front-end to work. 

If you would like to host your own NC-News Server, please follow these instructions. 

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


## Under Construction

Please note this readme file is under construction and is not yet complete.


## Original Repo

https://github.com/husainbismil/ncnews-server

https://github.com/northcoders/be-nc-news






