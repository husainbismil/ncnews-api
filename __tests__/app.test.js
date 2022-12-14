const request = require("supertest");
const app = require("../app/app");
const testData = require('../db/data/test-data/index.js');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');


beforeEach(() => {
  return seed(testData);
})

afterAll(() => {
  if (db.end) db.end();
});

describe("NCNews-Server Unit Tests", () => {

    describe("GET /api/topics/", () => {

        test("Responds with an array of objects, where the objects have at least two properties: slug & description", () => {

            return request(app).get("/api/topics").expect(200).then((response) => {
                const topics = response.body.topics;

                topics.forEach((topicObject) => {
                    expect(topicObject).toEqual(
                        expect.objectContaining({
                            slug: expect.any(String),
                            description: expect.any(String)
                    }));
                });
            });
        });
       
    
    });

    describe("GET /api/articles/", () => {

        test("Responds with an array of objects, where the objects have the following 7 properties: author, title, article_id, topic, created_at, votes, comment_count", () => {

            return request(app).get("/api/articles").expect(200).then((response) => {
                const articlesArray = response.body.articles;

                articlesArray.forEach((articleObject) => {
                    expect(articleObject).toEqual(
                        expect.objectContaining({
                            author: expect.any(String),
                            title: expect.any(String),
                            topic: expect.any(String),
                            article_id: expect.any(Number),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(Number)
                    }));
                });
            });
        });

        test("Responds with an array of objects, where the objects are sorted by Date using the 'created_at' property in Descending order (latest dates first)", () => {

            return request(app).get("/api/articles").expect(200).then((response) => {
                const articlesArray = response.body.articles;   
                articlesArray.forEach((e, index) => {
                    if (index < articlesArray.length - 1) {
                    expect(Date.parse(articlesArray[index]["created_at"]) > Date.parse(articlesArray[index + 1]["created_at"])).toBe(true);
                }});
            });

        });

           
    });

    // Task 5 - get api articles articleid

    describe("GET /api/articles/:article_id", () => {

        test("Responds with an object with key article and keyval of an object with the following 7 properties: author, title, article_id, topic, body, created_at, votes", () => {

            return request(app).get("/api/articles/1").expect(200).then((response) => {
                const article = response.body.article;

                    expect(article).toEqual(
                        expect.objectContaining({
                            author: expect.any(String),
                            title: expect.any(String),
                            topic: expect.any(String),
                            body: expect.any(String),
                            article_id: expect.any(Number),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                    }));
            });
        });

        test("Responds with the correct article object with correct articleID", () => {

            return request(app).get("/api/articles/2").expect(200).then((response) => {
                const article = response.body.article;
                expect(article["article_id"]).toBe(2);
            });

        });


    });

     // Task 6 - GET /api/articles/:article_id/comments

     describe("GET /api/articles/:article_id/comments", () => {

        test("Responds with an object with key comments and keyval an array of comments, where each comment should have the following properties: comment_id, votes, created_at, author, body", () => {

            return request(app).get("/api/articles/1/comments").expect(200).then((response) => {
                const comments = response.body.comments;

                expect(comments).toBeInstanceOf(Array);
                comments.forEach((commentObject) => {
                    expect(commentObject).toEqual(
                        expect.objectContaining({
                            comment_id: expect.any(Number),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            author: expect.any(String),
                            body: expect.any(String)
                    }));
                });
            });
        });

 
    });


    // Task 7 - POST /api/articles/:article_id/comments
    describe("7. POST /api/articles/:article_id/comments", () => {

        // should there be a test to see if the user exists? not sure, normally i'd do that but i think im meant to just stick to the happy path probably

        test("Responds with the newly posted comment", () => {

            const newComment = {
                username: "icellusedkars",
                body: "blah blah blah blah blah"
            };

            return request(app).post('/api/articles/1/comments').send(newComment).expect(201).then((response) => {
                expect(response.body.comment.body).toEqual("blah blah blah blah blah");
                expect(response.body.comment.author).toEqual("icellusedkars");
            });

    });

});

        


});