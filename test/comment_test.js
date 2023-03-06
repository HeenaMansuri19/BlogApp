let server = require("../index");
let chaiHttp = require("chai-http");
var chai = require("chai");
const utils = require("../model/commentsModelSchema");
let routes = require("../routers/commentsRouter");

chai.should();
chai.use(chaiHttp);


//1 Api of addBlog
describe("comments addComments API", () => {
    describe("post/api/blog", () => {
        it("IT should Return addComments details:", (done) => {
            const data = {
                "blogComment": "SUPERB"
            };
            chai
                .request(server)
                .post("/comment/addComment/63ee244d8d49e2a68a90db37/63fe00844545562e5a239bea")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq("Comment added successfully");
                    done();
                })
        })
    })
})