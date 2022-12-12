# Northcoders News API Server #

Welcome to Husain's NC-News Server repo, part of my Northcoders portfolio project. This repository includes the NC-News server files, which need to be hosted somewhere and running for the NC-News front-end to work. 

If you would like to host your own NC-News Server, please follow these instructions. 

## First Steps

Before anything, you can fork, clone, or download this repo. 

See here for help: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository

The repo files should be in a folder named 'ncnews-server'.


## Setting up your .env files

Next, you need to set up your 'dotenv' files. 

*"Dotenv files are used to load environment variables from a . env file into the running process. This file may expose sensitive information that could help a malicious user to prepare more advanced attacks."*

Step 1) Create a file in the root /ncnews-server/ folder, named '.env.development', without the quotes.

Step 2) Open the 'env.development' file. Copy the following code, paste it into the file, then save it. 

```js
PGDATABASE=nc_news
```

Step 3) Create a file in the root /ncnews-server/ folder, named '.env.test', without the quotes.

Step 4) Open the 'env.test' file. Copy the following code, paste it into the file, then save it. 

```js
PGDATABASE=nc_news_test
```


## Installing required dependencies

Next, you need to make sure you have the required npm packages installed for the application to function correctly. 

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
