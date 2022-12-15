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

    // Task 5 - get api articles articleid

    describe(`GET /api/articles/:article_id`, () => {

        test(`[ 200 ] Responds with an object with key article and keyval of an object with the following 7 properties: author, title, article_id, topic, body, created_at, votes`, () => {

            return request(app).get(`/api/articles/1`).expect(200).then((response) => {
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

        test(`[ 200 ] Responds with the correct article object with correct articleID`, () => {

            return request(app).get(`/api/articles/2`).expect(200).then((response) => {
                const article = response.body.article;
                expect(article[`article_id`]).toBe(2);
            });

        });

        test(`[ 404 ] Responds with an error when passed invalid parameters`, () => {

            return request(app).get(`/api/articles/sdfdefds`).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });

        });

        test(`[ 404 ] Responds with an error when passed an SQL injection test 1`, () => {

            return request(app).get(`/api/articles/1&#59;&nbsp;DROP&nbsp;TABLE&nbsp;articles`).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });

        });

        test(`[ 404 ] Responds with an error when passed an SQL injection test 2`, () => {

            return request(app).get(`/api/articles/1; DROP TABLE articles`).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });

        });


    });

     // Task 6 - GET /api/articles/:article_id/comments

     describe(`GET /api/articles/:article_id/comments`, () => {

        test(`[ 200 ] Responds with an object with key comments and keyval an array of comments, where each comment should have the following properties: comment_id, votes, created_at, author, body`, () => {

            return request(app).get(`/api/articles/1/comments`).expect(200).then((response) => {
                const comments = response.body.comments;

                expect(comments).toBeInstanceOf(Array);
                expect(comments).toHaveLength(11);

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

        test(`[ 404 ] Responds with an error when passed invalid parameters`, () => {

            return request(app).get(`/api/articles/sdfdefds/comments`).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });

        });

        test(`[ 404 ] Responds with an error when passed an SQL injection test 1`, () => {

            return request(app).get(`/api/articles/1&#59;&nbsp;DROP&nbsp;TABLE&nbsp;articles/comments`).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });

        });

        test(`[ 404 ] Responds with an error when passed an SQL injection test 2`, () => {

            return request(app).get(`/api/articles/1; DROP TABLE articles/comments`).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });

        });

 
    });


    // Task 7 - POST /api/articles/:article_id/comments
    describe(`POST /api/articles/:article_id/comments`, () => {

        // should there be a test to see if the user exists? not sure, normally i'd do that but i think im meant to just stick to the happy path probably

        const defaultComment = {
            username: `icellusedkars`,
            body: `blah blah blah blah blah`
        };

        test(`[ 201 ] Responds with the newly posted comment`, () => {

            const newComment = {
                username: `icellusedkars`,
                body: `blah blah blah blah blah`
            };

            return request(app).post('/api/articles/1/comments').send(newComment).expect(201).then((response) => {
                expect(response.body.comment.body).toEqual(`blah blah blah blah blah`);
                expect(response.body.comment.author).toEqual(`icellusedkars`);
            });

        });

        test(`[ 404 ] Responds with an error when passed invalid URL parameters`, () => {

            return request(app).post(`/api/articles/sdfdefds/comments`).send(defaultComment).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });

        });

        test(`[ 404 ] Responds with an error when passed an object without the required keys`, () => {

            const newComment = {
                wat: "k",
                k: "k"
            };

            return request(app).post('/api/articles/1/comments').send(newComment).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });

        });

        test(`[ 404 ] Responds with an error when passed an invalid username`, () => {

            const newComment = {
                username: 545435345,
                body: "k"
            };

            return request(app).post('/api/articles/1/comments').send(newComment).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });


        });

        test(`[ 404 ] Responds with an error when passed an invalid body of the wrong type`, () => {

            const newComment = {
                username: "k",
                body: 545435345
            };

            return request(app).post('/api/articles/1/comments').send(newComment).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });


        });

        test(`[ 404 ] Responds with an error when passed an SQL injection in the JSON object`, () => {

            const newComment = {
                username: `icellusedkars; DROP TABLE articles;`,
                body: `blah; DROP TABLE articles;`
            };

            return request(app).post('/api/articles/1/comments').send(newComment).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });


        });

        test(`[ 404 ] Responds with an error when passed an SQL injection in URL parameters, test 1`, () => {
            // %2Fapi%2Farticles%2F1%3B+DROP+TABLE+articles%3B%2Fcomments
            return request(app).post(`/api/articles/1&#59;&nbsp;DROP&nbsp;TABLE&nbsp;articles;/comments`).send(defaultComment).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });

        });

        test(`[ 404 ] Responds with an error when passed an SQL injection in URL parameters, test 2`, () => {

            return request(app).post(`/api/articles/1; DROP TABLE articles;/comments`).send(defaultComment).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });

        });


    });     

    // Task 8 - PATCH /api/articles/:article_id
    describe(`PATCH /api/articles/:article_id`, () => {

        const defaultVotesObject = { inc_votes : 1 };

        test(`[ 201 ] Responds with the updated article with correctly adjusted vote count, increasing vote count`, () => {
            const votesObject = { inc_votes : 2 };

            return request(app).patch('/api/articles/1').send(votesObject).expect(201).then((response) => {
                console.log(response.body.article)
                expect(response.body.article["article_id"]).toEqual(1);
                expect(response.body.article.votes).toEqual(102);
            });

        });

        test(`[ 201 ] Responds with the updated article with correctly adjusted vote count, decreasing vote count`, () => {
            const votesObject = { inc_votes : -5 };

            return request(app).patch('/api/articles/1').send(votesObject).expect(201).then((response) => {

                expect(response.body.article["article_id"]).toEqual(1);
                expect(response.body.article.votes).toEqual(95);
            });

        });

        test(`[ 404 ] Responds with an error when passed invalid URL parameters`, () => {

            return request(app).patch('/api/articles/fddfggdrtd').send(defaultVotesObject).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });

        });

        test(`[ 404 ] Responds with an error when passed an object without the required keys`, () => {

            const votesObject = {
                wat: "k",
                k: "k"
            };

            return request(app).post('/api/articles/1/comments').send(votesObject).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });

        });

        test(`[ 404 ] Responds with an error when passed an invalid vote of the wrong type`, () => {

            const votesObject = {
                inc_votes: `dksfsdjlfds`
            };

            return request(app).post('/api/articles/1/comments').send(votesObject).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });


        });

        test(`[ 404 ] Responds with an error when passed an SQL injection in the votes property`, () => {

            const votesObject = {
                inc_votes: `1; DROP TABLE articles;`
            };

            return request(app).post('/api/articles/1/comments').send(votesObject).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });


        });

        test(`[ 404 ] Responds with an error when passed an SQL injection in URL parameters, test 1`, () => {
            // %2Fapi%2Farticles%2F1%3B+DROP+TABLE+articles%3B%2Fcomments
            return request(app).post(`/api/articles/1&#59;&nbsp;DROP&nbsp;TABLE&nbsp;articles;/comments`).send(defaultVotesObject).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });

        });

        test(`[ 404 ] Responds with an error when passed an SQL injection in URL parameters, test 2`, () => {

            return request(app).post(`/api/articles/1; DROP TABLE articles;/comments`).send(defaultVotesObject).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "<strong>Error 404</strong> File Not Found" });
            });

        });

    }); 
       

// End Unit Tests
});