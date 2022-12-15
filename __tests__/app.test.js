const request = require(`supertest`);
const app = require(`../app/app`);
const testData = require('../db/data/test-data/index.js');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');


beforeEach(() => {
  return seed(testData);
})

afterAll(() => {
  if (db.end) db.end();
});

describe(`NCNews-Server Unit Tests`, () => {

    describe(`GET /api/topics/`, () => {

        test(`[ 200 ] Responds with an array of objects, where the objects have at least two properties: slug & description`, () => {

            return request(app).get(`/api/topics`).expect(200).then((response) => {
                const topics = response.body.topics;
                // will be using test data always
                expect(topics).toHaveLength(3);

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

    describe(`GET /api/articles/`, () => {

        test(`[ 200 ] Responds with an array of objects, where the objects have the following 7 properties: author, title, article_id, topic, created_at, votes, comment_count`, () => {

            return request(app).get(`/api/articles`).expect(200).then((response) => {
                const articlesArray = response.body.articles;
                expect(articlesArray).toHaveLength(12);

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

        test(`[ 200 ] Responds with an array of objects, where the objects are sorted by Date using the 'created_at' property in Descending order (latest dates first)`, () => {

            return request(app).get(`/api/articles`).expect(200).then((response) => {
                const articlesArray = response.body.articles;   
                expect(articlesArray).toHaveLength(12);

                articlesArray.forEach((e, index) => {
                    if (index < articlesArray.length - 1) {
                    expect(Date.parse(articlesArray[index][`created_at`]) > Date.parse(articlesArray[index + 1][`created_at`])).toBe(true);
                }});
            });

        });

           
    });

    // Error Handling
    describe("Error Handling Tests", () => {
        // GET METHOD 404 ERROR TEST
        test("[ 404 ] Responds with a 404 error when an invalid path is specified", () => {
          return request(app).get("/sdfhdshifsdhfsd").expect(404).then((response) => {
              expect(response.body).toEqual({ error: "Error 404! File Not Found" });
            });
        });
        // need 500 internal server error test - find out what to do for that one
    });

    // Task 5 - get api articles articleid

    describe(`GET /api/articles/:article_id`, () => {

        test(`[ 200 ] Responds with an object with key article and keyval of an object with the following 7 properties: author, title, article_id, topic, body, created_at, votes`, () => {

            return request(app).get(`/api/articles/1`).expect(200).then((response) => {
                const article = response.body.article;
 
                    expect(article).toEqual(
                        expect.objectContaining({
                            title: "Living in the shadow of a great man",
                            topic: "mitch",
                            author: "butter_bridge",
                            body: "I find this existence challenging",
                            votes: 100,
                            article_id: 1
                    }));                   
            });
        });

        test(`[ 200 ] Responds with the correct article object with correct articleID`, () => {

            return request(app).get(`/api/articles/2`).expect(200).then((response) => {
                const article = response.body.article;
                expect(article[`article_id`]).toBe(2);
            });

        });

        test(`[ 400 ] Responds with an error when passed invalid parameters`, () => {

            return request(app).get(`/api/articles/sdfdefds`).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
            });

        });

        test(`[ 400 ] Responds with an error when passed an SQL injection test 1`, () => {

            return request(app).get(`/api/articles/1&#59;&nbsp;DROP&nbsp;TABLE&nbsp;articles`).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
            });

        });

        test(`[ 400 ] Responds with an error when passed an SQL injection test 2`, () => {

            return request(app).get(`/api/articles/1; DROP TABLE articles`).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
            });

        });

        test(`[ 404 ] Responds with an error when passed a valid but non-existent article id`, () => {

            return request(app).get(`/api/articles/99999999`).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "Error 404! File Not Found" });
            });

        });


    });


});