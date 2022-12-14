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


});