process.env.NODE_ENV = 'test';

const server = require('../app')
const mongoose = require("mongoose");
const User = require('../models/user');

// Chai stuff
const chai = require('chai');
let assert = chai.assert;
let expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('GET /', () => {
  it('it should return a resource not found and a status of 404', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});


describe('POST /user/register', () => {
  it('it should return an error with status code 400 for a request with an empty body', (done) => {
    let user = {}
    chai.request(server)
      .post('/user/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        expect(res.body).to.include.all.keys('error');
        done();
      });
  });
});

describe('POST /user/register', () => {
  beforeEach((done) => {
    User.deleteMany({}, () => {})
    done();
  })
  afterEach((done) => {
    User.deleteMany({}, () => {})
    done();
  })
  it('it should send a status code of 201 (created) with valid body contents ', (done) => {
    let user = {
      email: 'bjnih@live.com',
      password1: 'mypass123',
      password2: 'mypass123',
      first_name: 'Bin',
      last_name: 'is'
    }
    chai.request(server)
      .post('/user/register')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });
});


describe('POST /user/register', () => {
  beforeEach((done) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: 'bjnih@live.com',
      password: 'mypass123',
      first_name: 'Bin',
      last_name: 'is'
    })
    user.save()
    done();
  })
  it('it should return error after using the same email again', (done) => {
    let user_ = {
      email: 'bjnih@live.com',
      password1: 'mypass123',
      password2: 'mypass123',
      first_name: 'Bin',
      last_name: 'is'
    }
    chai.request(server)
      .post('/user/register')
      .send(user_)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.include.all.keys('error');
        done();
      });
  });
  afterEach((done) => {
    User.deleteMany({}, () => {})
    done();
  })
});