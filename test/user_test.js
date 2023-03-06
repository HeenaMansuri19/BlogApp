let server = require("../index");
let chaiHttp = require("chai-http");
var chai = require("chai");
const utils = require("../model/userModelSchema");
let routes = require("../routers/userRouter");
var randomEmail = require('random-email');


chai.should();
chai.use(chaiHttp);


describe("User signUp API", () => {
    describe("POST/api/users", () => {
        it("IT should Return signUp user details:", (done) => {
            const data = {
                userName: "Heena",
                userEmail: "heenamansuri87961@gmail.com",
                password: "HHee@000",
                city: "Dewas",
                state: "Madhya Pradesh",
                phoneNo: "9380271881"
            };
            chai
                .request(server)
                .post("/user/register")
                .set("content-Type", "application/x-www-form-urlencoded")
                .field(data)
                .attach("profilePic", "/Users/LENOVO/OneDrive/Pictures/Patienttracker.png", "Patienttracker.png")
                .end((err, res) => {
                    res.should.have.status(409);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("failure");
                    res.body.should.have.property("message").eq("Email already exists for this user");
                    done();
                })
        })
        it("It should Return successfull Message :", (done) => {
            let email = (randomEmail({ domain: 'gmail.com' }))
            const data = {
                userName: "Anushka",
                userEmail: email,
                password: "AAee@000",
                city: "Dewas",
                state: "Madhya Pradesh",
                phoneNo: "9380271881"
            };
            chai
                .request(server)
                .post("/user/register")
                .attach("profilePic", "/Users/LENOVO/OneDrive/Pictures/Patienttracker.png", "Patienttracker.png")
                .field(data)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq("Registration successful");
                    done();
                });
        })
    })
})


describe("User Login API", () => {
    describe("POST/api/users", () => {
        it("IT should Return login user details:", (done) => {
            const data = {
                userEmail: "heenamansuri87961@gmail.com",
                password: "AAbzc@123",
            };
            chai
                .request(server)
                .post("/user/userLogin")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq("Login successfull");
                    res.body.should.have.property("token");
                    done();
                })
        })
        it("It should Return Error Message :", (done) => {
            const data = {
                userEmail: "mansuri098@gmail.com",
                password: "ZZff66@567",
            };
            chai
                .request(server)
                .post("/user/userLogin")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("failure");
                    res.body.should.have
                        .property("message")
                        .eq("Email or password is not valid")
                    done();
                });
        })
        it("It should Return  Email or password Error Message:", (done) => {
            const data = {
                userEmail: "hinamansureri098@gmail.com",
                password: "ZZff@567",
            };
            chai
                .request(server)
                .post("/user/userLogin")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property("success").eq("failure");
                    res.body.should.have.property("message").eq("You are not a register user")
                    done();
                })
        })

    })
})


describe("User resetPassEmail API", () => {
    describe("POST/api/users", () => {
        it("IT should Return resetPassEmail user details:", (done) => {
            const data = {
                userEmail: "heenamansuri87961@gmail.com",
            };
            chai
                .request(server)
                .post("/user/resetPassEmail")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq("Email sent successfully");

                    done();
                })
        })
        it("IT should Return resetPassEmail user details:", (done) => {
            const data = {
                userEmail: "99heenamansuri87961@gmail.com",
            };
            chai
                .request(server)
                .post("/user/resetPassEmail")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("failure");
                    res.body.should.have.property("message").eq("Email user is not found");
                    done();
                })
        })
    })
})



describe("User resetPassword API", () => {
    describe("POST/api/users", () => {
        it("IT should Return resetPassword details:", (done) => {
            const data = {
                "newPassword":"AAbzc@123",
                "confirmPassword":"AAbzc@123"
            };
            chai
                .request(server)
                .post("/user/userResetPassword/63ff49a3ddc30bc0abe00586/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2ZmNDlhM2RkYzMwYmMwYWJlMDA1ODYiLCJpYXQiOjE2Nzc3NTU4NjYsImV4cCI6MTY3Nzc1NzA2Nn0.SUuBBIewP7rw6szwTn1g_vpzqtZzI8Ittj8u002yeb4")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("success");
                    res.body.should.have.property("message").eq("Password update successfully");
                    done();
                })
        })
        it("IT shouldnot Return resetPassword details:", (done) => {
            const data = {
                "newPassword": "AAbzc@123",
                "confirmPassword": "AAb32323c@123"
            };
            chai
                .request(server)
                .post("/user/userResetPassword/63ff49a3ddc30bc0abe00586/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2ZmNDlhM2RkYzMwYmMwYWJlMDA1ODYiLCJpYXQiOjE2Nzc3NTUyNTAsImV4cCI6MTY3Nzc1NjQ1MH0.YCANI3TgOmP0ft-BmOmiEg7xdo4uQB9xw2LaCIpw5I4")
                .send(data)
                .end((err, res) => {
                    res.should.have.status(403);
                    res.should.be.a("object");
                    res.body.should.have.property("success").eq("failure");
                    res.body.should.have.property("message").eq("Password and confirm password is not match");
                    done();
             })
        })
    })
})




