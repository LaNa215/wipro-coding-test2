const supertest = require("supertest");
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);


describe("POST /users", function(){
  it("should fail to create a user without a firstName",async() => {
    const res = await supertest(app)
      .post("/users")
      .send({
              lastName: 'Smith',
              age: 16,
              profession: 'gamer',
            })
            console.log(res.status)
            expect(res.status).to.equal(400);  
  });
 
  it('should create a user', async () => {
    const user = {
      firstName: 'John',
      lastName: 'Smith',
      age: '16',
      profession: 'gamer',
    };
    const res = await supertest(app).post('/users').send(user);
    expect(res.status).to.equal(201);
   expect(res.body.firstName).to.equal(user.firstName);
   expect(res.body.lastName).to.equal(user.lastName);
   expect(res.body.age).to.equal(user.age);
  expect(res.body.profession).to.equal(user.profession);
  });
});

describe("POST /pets", function(){
  it("should fail to create a user without a firstName",async() => {
    const res = await supertest(app)
      .post("/pets")
      .send({
        age: "28",
        color:"black"
    })
            expect(res.status).to.equal(400);  
  });
 
  it('should create a user', async () => {
    const pets = {
      name: "Lucky",
      age: 28,
      color:"black"
  }
    const res = await supertest(app).post('/pets').send(pets);
    expect(res.status).to.equal(201);
   expect(res.body.name).to.equal(pets.name);
   expect(res.body.color).to.equal(pets.color);
   expect(res.body.age).to.equal(pets.age);
  });
});