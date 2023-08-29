const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const Job = require("../models/jobModel");
const Bid = require("../models/bidModel");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongod = new MongoMemoryServer();

beforeAll(async () => {
  const uri = await mongod.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe("Job Controller", () => {
  beforeEach(async () => {
    await Job.deleteMany();
  });

  it("should create a new job", async () => {
    const jobData = {
      title: "Test Job",
      description: "This is a test job",
      user_email: "test@example.com",
      skills: ["Skill 1", "Skill 2"],
      budget: 1000,
      duration: 7,
    };

    const response = await request(app)
      .post("/api/v1/jobs")
      .send(jobData)
      .expect(201);

    expect(response.body.title).toBe(jobData.title);
    expect(response.body.description).toBe(jobData.description);
    // Add more assertions based on your requirements
  });

  it("should get all jobs", async () => {
    const job1 = {
      title: "Job 1",
      description: "Job 1 description",
      user_email: "user1@example.com",
      skills: ["Skill 1"],
      budget: 100,
      duration: 5,
    };

    const job2 = {
      title: "Job 2",
      description: "Job 2 description",
      user_email: "user2@example.com",
      skills: ["Skill 2"],
      budget: 200,
      duration: 7,
    };

    await Job.create(job1);
    await Job.create(job2);

    const response = await request(app).get("/api/v1/jobs").expect(200);

    expect(response.body.length).toBe(2);
    // Add more assertions based on your requirements
  });

  // Add more test cases for other job controller functionalities
});

describe("Bid Controller", () => {
  beforeEach(async () => {
    await Bid.deleteMany();
  });

  it("should create a new bid", async () => {
    const bidData = {
      job_id: "jobId", // Replace with an actual job ID
      proposal: "Test proposal",
      price: 500,
    };

    const response = await request(app)
      .post("/api/v1/bids")
      .send(bidData)
      .expect(201);

    expect(response.body.proposal).toBe(bidData.proposal);
    expect(response.body.price).toBe(bidData.price);
    // Add more assertions based on your requirements
  });

  it("should get all bids for a job", async () => {
    const job = await Job.create({
      title: "Job with Bids",
      description: "Job with bids description",
      user_email: "user@example.com",
      skills: ["Skill 1"],
      budget: 1000,
      duration: 10,
    });

    const bid1 = await Bid.create({
      job: job._id,
      user: "userId",
      user_email: "user@example.com",
      proposal: "Bid 1 proposal",
      price: 300,
    });

    const bid2 = await Bid.create({
      job: job._id,
      user: "userId",
      user_email: "user@example.com",
      proposal: "Bid 2 proposal",
      price: 400,
    });

    const response = await request(app)
      .get(`/api/v1/jobs/${job._id}/bids`)
      .expect(200);

    expect(response.body.length).toBe(2);
  });
});
