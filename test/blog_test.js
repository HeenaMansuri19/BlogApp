let server = require("../index");
let chaiHttp = require("chai-http");
var chai = require("chai");
const utils = require("../model/blogModelSchema");
let routes = require("../routers/blogRouters");
var randomEmail = require('random-email');

chai.should();
chai.use(chaiHttp);


//1 Api of addBlog
describe("Blog addBlog API", () => {
    describe("PATCH/api/blog", () => {
        it("IT should Return likes details:", (done) => {
            const data = {
                blogTitle: "BlogMaker",
                blogDescription: "How are you?",
            };
            chai
                .request(server)
                .post("/blog/addBlog/63ee244d8d49e2a68a90db37")
                .set("content-Type", "application/x-www-form-urlencoded")
                .field(data)
                .attach("blogImage","/Users/LENOVO/OneDrive/Pictures/Patienttracker.png", "Patienttracker.png")
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq("Blog is posted successfully");
                    done();
                })
        })
    })
})


//2. bloglike testcase
describe("Blog likes API", () => {
    describe("PATCH/api/blog", () => {
        it("IT should Return likes details:", (done) => {
            const data = {
                blogLikes: "true"
            };
            chai
                .request(server)
                .patch("/blog/blogLike/63f24b8cc44a64446a86ccac")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(202);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq("You like a blog");
                    done();
                })
        })
        it("IT should Return unliked details:", (done) => {
            const data = {
                blogLikes: "false"
            };
            chai
                .request(server)
                .patch("/blog/blogLike/63f24b8cc44a64446a86ccac")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(202);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq("You unliked the blog");
                    done();
                })
        })
    })
})


//3. blogDetails API testcase
describe("blogDetails API", () => {
    describe("get/api/blog", () => {
        it("IT should Return blogDetails:", (done) => {
            chai
                .request(server)
                .get("/blog/blogDetails/63fe00844545562e5a239bea")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq("Here is the blog");
                    res.body.should.have.property("blogData")
                    done();
                })
        })
    })
})


//4. API of getBlog(list)
describe("Blog getBlog API", () => {
    describe("get/api/blog", () => {
        it("IT should Return list of details:", (done) => {
            chai
                .request(server)
                .get("/blog/getBlog")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq("The displayed lists of blog are here");
                    res.body.should.have.property("data")
                    done();
                })
        })
    })
})


//5. API of searchBlog
describe("Blog searchBlog API", () => {
    describe("get/api/blog", () => {
        it("IT should Return likes details:", (done) => {
            const data = {
                "blogTitle": "g"
            }
            chai
                .request(server)
                .get("/blog/searchBlog")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq("All blogs related to search");
                    res.body.should.have.property("data")
                    done();
                })
        })
    })
})


//6. API of myBlog
describe("Blog myBlog API", () => {
    describe("get/api/blog", () => {
        it("IT should Return myBlog details:", (done) => {
            chai
                .request(server)
                .get("/blog/myblog/63ee244d8d49e2a68a90db37")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("data")
                    done();
                })
        })
    })
})


//CRUD IN BLOG
describe("Blog editBlog API", () => {
    describe("PATCH/api/blog", () => {
        it("IT should Return editBlog:", (done) => {
            const data = {
                "blogTitle": "GOOGLE",
                "blogDescription": "This is my GOOGLE's blogApp",
                "blogLikes": "2"
            }
            chai
                .request(server)
                .patch("/blog/editBlog/63fdeab64372b0621b6c95ae")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq("Blog edited successfully");
                    done();
                })
        })
    })
})




describe("Blog deleteBlog API", () => {
    describe("delete/api/blog", () => {
        it("IT should Return myBlog details:", (done) => {

            chai
                .request(server)
                .delete("/blog/deleteBlog/63fdf89276b6abc9b387388a")

                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq("Blog is deleted");
                    done();
                })
        })
    })
})

