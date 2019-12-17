let assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

describe ("Teachers CRUD", () => {

  it("Should get Teacher in DB", (done) => {

    // First create a teacher
    const teacherIdToGet = null;

    chai.request(server)
    .post(`/teacher/${teacherIdToGet}`)
    .send()
    .end((err, res) => {
      res.should.have.status(200);
    });
    done();
  });

  it("Should add Teacher in DB", (done) => {

    const teacher = {
      name: "Uncle Bob",
      age: 60,
    };

    chai.request(server)
    .post("/teacher/")
    .send(teacher)
    .end((err, res) => {
      res.should.have.status(200);
    });
    done();
  });

  it("Should update Teacher in DB", (done) => {

    // Create teacher and get the ID
    const teacherId = null;

    const teacherUpdate = {
      name: "Rober C Martin",
      age: 25
    };

    chai.request(server)
    .update(`/teacher/${teacherId}`)
    .send(teacherUpdate)
    .end((err, res) => {
      res.should.have.status(200);
    });
    done();
  });

  it("Should delete Teacher in DB", (done) => {

    // Create teacher and get the ID
    const teacherIdToDelete = null;

    chai.request(server)
    .delete(`/teacher/${teacherIdToDelete}`)
    .send()
    .end((err, res) => {
      res.should.have.status(201);
    });
    done();
  });
});