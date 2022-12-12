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

    describe("1) GET /api/topics/", () => {

        test("Responds with an array of objects, where the objects have at least two properties: slug & description", () => {

            return request(app).get("/api/topics").expect(200).then((response) => {
                const topics = response.body;

                expect(topics).toBeInstanceOf(Array);
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


});