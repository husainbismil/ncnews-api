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

        // Task 10 - add in queries

        describe(`GET /api/articles - URL Parameters`, () => {

            // include test to make sure it works for articles? aswell as articles/?
            // include thorough sql injection tests in each section below

            describe(`GET /api/articles/?topic=`, () => {

            });

            describe(`GET /api/articles/?order=`, () => {

                test(`[ 200 ] By default when passed no order param, server responds with an array of objects, where the objects are sorted by Date using the 'created_at' property in Descending order.`, () => {

                    return request(app).get(`/api/articles`).expect(200).then((response) => {
                        const articlesArray = response.body.articles;   
                        expect(articlesArray).toHaveLength(12);
        
                        articlesArray.forEach((e, index) => {
                            if (index < articlesArray.length - 1) {
                            expect(Date.parse(articlesArray[index][`created_at`]) > Date.parse(articlesArray[index + 1][`created_at`])).toBe(true);
                        }});
                    });
                });

                test(`[ 200 ] When passed "asc" as a URL parameter, server responds with an array of objects, where the objects are sorted by Date using the 'created_at' property in Ascending order.`, () => {

                    return request(app).get(`/api/articles?order=asc`).expect(200).then((response) => {
                        const articlesArray = response.body.articles;   
                        expect(articlesArray).toHaveLength(12);
        
                        articlesArray.forEach((e, index) => {
                            if (index < articlesArray.length - 1) {
                            expect(Date.parse(articlesArray[index][`created_at`]) < Date.parse(articlesArray[index + 1][`created_at`])).toBe(true);
                        }});
                    });
                });

                test(`[ 200 ] Makes sure this endpoint works if URL is formatted slightly differently`, () => {

                    return request(app).get(`/api/articles/?order=asc`).expect(200).then((response) => {
                        const articlesArray = response.body.articles;   
                        expect(articlesArray).toHaveLength(12);
        
                        articlesArray.forEach((e, index) => {
                            if (index < articlesArray.length - 1) {
                            expect(Date.parse(articlesArray[index][`created_at`]) < Date.parse(articlesArray[index + 1][`created_at`])).toBe(true);
                        }});
                    });
                });

                test(`[ 200 ] When passed "desc" as a URL parameter, server responds with an array of objects, where the objects are sorted by Date using the 'created_at' property in Descending order.`, () => {

                    return request(app).get(`/api/articles?order=desc`).expect(200).then((response) => {
                        const articlesArray = response.body.articles;   
                        expect(articlesArray).toHaveLength(12);
        
                        articlesArray.forEach((e, index) => {
                            if (index < articlesArray.length - 1) {
                            expect(Date.parse(articlesArray[index][`created_at`]) > Date.parse(articlesArray[index + 1][`created_at`])).toBe(true);
                        }});
                    });
                });

                test(`[ 404 ] Responds with an error when passed invalid parameters, test 1`, () => {

                    return request(app).get(`/api/articles?order=sdfdefds`).expect(404).then((response) => {
                        expect(response.body).toEqual({ error: "Error 404! File Not Found" });
                    });
        
                });

                test(`[ 404 ] Responds with an error when passed invalid parameters, test 2`, () => {

                    return request(app).get(`/api/articles?order=1337`).expect(404).then((response) => {
                        expect(response.body).toEqual({ error: "Error 404! File Not Found" });
                    });
        
                });
        
                test(`[ 404 ] Responds with an error when passed an SQL injection test 1`, () => {
                    
                    return request(app).get(`/api/articles?order=1&#59;&nbsp;DROP&nbsp;TABLE&nbsp;articles`).expect(404).then((response) => {
                        expect(response.body).toEqual({ error: "Error 404! File Not Found" });
                    });
        
                });
        
                test(`[ 404 ] Responds with an error when passed an SQL injection test 2`, () => {
                    console.log("test is running: [ 404 ] Responds with an error when passed an SQL injection test 2")
                    return request(app).get(`/api/articles?order=asc; DROP TABLE articles`).expect(404).then((response) => {
                        expect(response.body).toEqual({ error: "Error 404! File Not Found" });
                    });
        
                });

                
                // End sort_by tests
            });

            describe(`GET /api/articles/?order=`, () => {

                // end order tests
            });

            describe(`GET /api/articles/?order=A&topic=B&sort_by=C`, () => {

            });


            describe(`GET /api/articles/? - other cases`, () => {

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

        test(`[ 404 ] Responds with an error when passed invalid parameters / that do not exist`, () => {

            return request(app).get(`/api/articles/sdfdefds`).expect(404).then((response) => {
                expect(response.body).toEqual({error: "Error 404! File Not Found"});
            });

        });

        test(`[ 404 ] Responds with an error when passed an SQL injection test 1`, () => {

            return request(app).get(`/api/articles/1&#59;&nbsp;DROP&nbsp;TABLE&nbsp;articles`).expect(404).then((response) => {
                expect(response.body).toEqual({error: "Error 404! File Not Found"});
            });

        });

        test(`[ 404 ] Responds with an error when passed an SQL injection test 2`, () => {

            return request(app).get(`/api/articles/1; DROP TABLE articles`).expect(404).then((response) => {
                expect(response.body).toEqual({error: "Error 404! File Not Found"});
            });

        });

        test(`[ 404 ] Responds with an error when passed a valid but non-existent article id`, () => {

            return request(app).get(`/api/articles/99999999`).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "Error 404! File Not Found" });
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

        test(`[ 200 ] Valid ID, article exists, but no comments responds with no content`, () => {

            //  TODO: this needs to be changed, behaviour needs to return an empty array in this case.

                return request(app).get(`/api/articles/37/comments`).expect(404).then((response) => {
                    expect(response.body).toEqual({ error: "Error 404! File Not Found" });
                });

        });

        test(`[ 404 ] Responds with an error when passed a non existent ID`, () => {

            return request(app).get(`/api/articles/999999/comments`).expect(404).then((response) => {
                expect(response.body).toEqual({ error: "Error 404! File Not Found" });
            });

        });

        test(`[ 400 ] Responds with an error when passed invalid parameters`, () => {

            return request(app).get(`/api/articles/sdfdefds/comments`).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
            });

        });

        test(`[ 404 ] Responds with an error when passed an SQL injection test 1`, () => {

            return request(app).get(`/api/articles/1&#59;&nbsp;DROP&nbsp;TABLE&nbsp;articles/comments`).expect(404).then((response) => {
                expect(response.body).toEqual({error: "Error 404! File Not Found"});
            });

        });

        test(`[ 400 ] Responds with an error when passed an SQL injection test 2`, () => {

            return request(app).get(`/api/articles/1; DROP TABLE articles/comments`).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
            });

        });

 
    });


    // Task 7 - POST /api/articles/:article_id/comments
    describe(`POST /api/articles/:article_id/comments`, () => {

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

        test(`[ 400 ] Responds with an error when passed invalid URL parameters`, () => {

            return request(app).post(`/api/articles/sdfdefds/comments`).send(defaultComment).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
            });

        });

        test(`[ 400 ] Responds with an error when username does not exist`, () => {

            const newComment = {
                username: `icellusedkdfsfdsfdsfsdars`,
                body: `blah blah blah blah blah`
            };

            return request(app).post('/api/articles/1/comments').send(newComment).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
                //expect(response.body).toEqual({ error: "Error 404! File Not Found" });
            });

        });

        test(`[ 400 ] Responds with an error when passed an object without the required keys`, () => {

            const newComment = {
                wat: "k",
                k: "k"
            };

            return request(app).post('/api/articles/1/comments').send(newComment).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
            });

        });

        test(`[ 400 ] Responds with an error when passed an invalid username`, () => {

            const newComment = {
                username: 545435345,
                body: "k"
            };

            return request(app).post('/api/articles/1/comments').send(newComment).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
            });


        });

        test(`[ 400 ] Responds with an error when passed an SQL injection in the JSON object`, () => {

            const newComment = {
                username: `icellusedkars; DROP TABLE articles;`,
                body: `blah; DROP TABLE articles;`
            };

            return request(app).post('/api/articles/1/comments').send(newComment).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
            });


        });

        test(`[ 400 ] Responds with an error when passed an SQL injection in URL parameters`, () => {

            return request(app).post(`/api/articles/1; DROP TABLE articles;/comments`).send(defaultComment).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
            });

        });


    });       

    // Task 8 - PATCH /api/articles/:article_id
    describe(`PATCH /api/articles/:article_id`, () => {

        const defaultVotesObject = { inc_votes : 1 };

        test(`[ 201 ] Responds with the updated article with correctly adjusted vote count, increasing vote count`, () => {
            const votesObject = { inc_votes : 2 };

            return request(app).patch('/api/articles/1').send(votesObject).expect(201).then((response) => {
                
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

        test(`[ 400 ] Responds with an error when passed invalid URL parameters`, () => {

            return request(app).patch('/api/articles/fddfggdrtd').send(defaultVotesObject).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
            });

        });

        test(`[ 400 ] Responds with an error when passed an object without the required keys`, () => {

            const votesObject = {
                wat: "k",
                k: "k"
            };

            return request(app).post('/api/articles/1/comments').send(votesObject).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
            });

        });

        test(`[ 400 ] Responds with an error when passed an invalid vote of the wrong type`, () => {

            const votesObject = {
                inc_votes: `dksfsdjlfds`
            };

            return request(app).post('/api/articles/1/comments').send(votesObject).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
            });


        });

        test(`[ 400 ] Responds with an error when passed an SQL injection in the votes property`, () => {

            const votesObject = {
                inc_votes: `1; DROP TABLE articles;`
            };

            return request(app).post('/api/articles/1/comments').send(votesObject).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
            });


        });

        
        test(`[ 400 ] Responds with an error when passed an SQL injection in URL parameters, test 2`, () => {

            return request(app).post(`/api/articles/1; DROP TABLE articles;/comments`).send(defaultVotesObject).expect(400).then((response) => {
                expect(response.body).toEqual({ error: "Error 400! BAD REQUEST" });
            });

        });

    }); 

    // Task 9 - GET /api/users
    describe(`GET /api/users/`, () => {

        test(`[ 200 ] Responds with an array of objects, where the objects have the following 3 properties: username, name, avatar_url`, () => {

            return request(app).get(`/api/users`).expect(200).then((response) => {
                const usersArray = response.body.users;
                expect(usersArray).toHaveLength(4);

                usersArray.forEach((userObject) => {
                    expect(userObject).toEqual(
                        expect.objectContaining({
                            username: expect.any(String),
                            name: expect.any(String),
                            avatar_url: expect.any(String)
                    }));
                });
            });
        });
           
    });
       

// End Unit Tests
});