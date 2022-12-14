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
              expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });
        });
        // need 500 internal server error test - find out what to do for that one
    });

// End Unit Tests
});