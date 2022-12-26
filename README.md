# Northcoders News Web API Server #

<p align="center">
  <img title="NC News" width="380" alt="NC News" src="https://github.com/husainbismil/ncnews-server/blob/main/u_logo.png?raw=true">
</p>

## Welcome!

NCNews-Server is an API server that is designed to serve API requests for display on a front end application, created using example data. The purpose of this application is to demonstrate my skills in Javascript and the Node.JS Javascript Framework. 

### NCNews Web API Server Details

Based on REST principles, the NCNews-Server Web API endpoints return example JSON metadata from an elephantSQL database, populated with example data provided by Northcoders (the software development bootcamp providers)

The base address of the NCNews-Server Web API is currently https://ncnews-server.onrender.com/api/ .

The API provides a set of endpoints, each with its own unique path. You can view a list of all endpoints by visiting the above link.

### Requests

| Method  | Action |
| ------------- | ------------- |
| GET  | Retrieves resource(s)  |
| POST  | Creates resource  |
| PATCH  | Changes resource   |
| DELETE  | Deletes resource  |

### Timestamps

Most responses will have a timestamp attached. Timestamps are returned in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.

### Responses

#### Pagination

> **Please Note: This feature is not yet implemented!**

Some endpoints support a way of paging the dataset, taking an offset and limit as query parameters:

`
$ curl
https://ncnews-server.onrender.com/api/articles?offset=20&limit=10
`

In this example, in a list of 50 (total) articles : From the twentieth (offset) article, retrieve the next 10 (limit) articles.

#### Response Status Codes

NCNews-Server Web API uses the following response status codes, as defined in the RFC 2616 and RFC 6585:

| Status Code | Description                                                                                                                                                                                                          |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 200         | OK - The request has succeeded. The client can read the result of the request in the body and the headers of the response.                                                                                           |
| 201         | Created - The request has been fulfilled and resulted in a new resource being created.                                                                                                                               |
| 202         | Accepted - The request has been accepted for processing, but the processing has not been completed.                                                                                                                  |
| 204         | No Content - The request has succeeded but returns no message body.                                                                                                                                                  |
| 304         | Not Modified.                                                                                                                                                                               |
| 400         | Bad Request - The request could not be understood by the server due to malformed syntax. The message body will contain more information; see Response Schema.                                                        |
| 401         | Unauthorized - The request requires user authentication or, if the request included authorization credentials, authorization has been refused for those credentials.                                                 |
| 403         | Forbidden - The server understood the request, but is refusing to fulfill it.                                                                                                                                        |
| 404         | Not Found - The requested resource could not be found. This error can be due to a temporary or permanent condition.                                                                                                  |
| 429         | Too Many Requests - Rate limiting has been applied.                                                                                                                                                                  |
| 500         | Internal Server Error. You should never receive this error because all errors should be caught|
| 502         | Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server.                                                                                                 |
| 503         | Service Unavailable - The server is currently unable to handle the request due to a temporary condition which will be alleviated after some delay. You can choose to resend the request again.                       |

#### Response Error Object

Apart from the response code, unsuccessful responses return a JSON object containing the following information:

| Key     | Value Type | Value Description                                                                                                      |
|---------|------------|------------------------------------------------------------------------------------------------------------------------|
| status  | integer    | The HTTP status code that is also returned in the response header. For further information, see Response Status Codes. |
| error | string     | A short description of the cause of the error.                                                                         | 	


### What is NC News Server

**NCNews-Server** (NC News API Server) is a back-end server application that is designed to serve API requests, which are responsible for displaying requested content and allowing controlled user manipulation of data via its React.js based **NCNews-WebApp** front-end. 

**The NCNews API Server is live here** (please note, this is not the front end): https://ncnews-server.onrender.com/

Please note, as the application is currently being hosted on a free service, it may take a while to load for the first time. 

This API allows users of the WebApp to view and interact with the ElephantSQL hosted PostgreSQL database by simply interacting with user interface elements on the front-end, which runs in the internet browser on the clients device, and from the client HTTP requests are sent to preset API endpoints on the NC News API Server . The **NC News API Server** can also be alternatively put into use by sending HTTP requests directly to it without the use of a front end, for example through a tool such as Insomnia, an API Testing Tool, your own application, etc.

These two apps were developed as part of my Northcoders Portfolio using the Object Oriented Programming programming paradigm, Model View Controller software architechtural pattern, Test Driven Software Development via Jest, along with Agile project management techniques such as Kanban (Trello) as part of their 13-week Software Development bootcamp: www.northcoders.com.

## Hosting your own NC News Server Instance

If you would like to host your own NC-News Server, please follow these instructions. 

  <img align="right" title="NC News" width="200" alt="NC News" src="https://github.com/husainbismil/ncnews-server/blob/main/btn_veps.png?raw=true">

### First Steps

Before anything, you can fork, clone, or download this repo. 

See here for help: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository

The repo files should be in a folder named 'ncnews-server'.
 
 
### Setting up your .env files

Next, you need to set up your 'dotenv' files. 

*"Dotenv files are used to load environment variables from a . env file into the running process. This file may expose sensitive information that could help a malicious user to prepare more advanced attacks."*

Step 1) Create a file in the root /ncnews-server/ folder, named '.env.development', without the quotes.

<!-- add in instructions for .env.production file for hosting -->

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
sudo chmod 440 .env.production
sudo chmod 440 .env.development
sudo chmod 440 .env.test
```

### Installing required dependencies

First, you need to install nodejs, the nodejs package manager (npm), and postgresql. 

For linux (ubuntu/debian), use these instructions to do that, located under the heading "Install Node.js and npm from the Ubuntu repository": https://linuxize.com/post/how-to-install-node-js-on-ubuntu-20-04/

For Windows, use these instructions: [windows instructions]

For WSL, use these instructions: [wsl instructions]

For Mac OSX, use these instructions: [mac osx instructions]

Once nodeJS and psql are verified as installed, you can proceed to the next steps below. 

Next, you need to make sure you have the required npm (node package manager) packages installed for the application to function correctly. 

Step 5) Open a terminal instance and navigate to your /ncnews-server/ folder.

Step 6) Copy in the following line and press enter:

```js
npm install
```

Alternatively you can search from the following list on the NPM website: 

Development Dependencies: 

```js
husky, jest, jest-extended, pg-format, supertest
```

Dependencies
: 
```js
dotenv, express, pg, pg-format, supertest
```

Assuming no errors are encountered, proceed to the next step. 

Run the following command in terminal to seed the psql database:

```js
psql -f ./db/setup.sql
```

  <img align="right" title="NC News" width="200" alt="NC News" src="https://github.com/husainbismil/ncnews-server/blob/main/btn_veps.png?raw=true">



## Under Construction

Please note this readme file is under construction and is not yet complete. 



## Original Repo

https://github.com/husainbismil/ncnews-server

https://github.com/northcoders/be-nc-news
