const request = require("supertest");
const app = require("../app");
const { tokenSign } = require("../utils/handleJwt");
const { testAuthRegister } = require("./helper/helperData")
const { usersModel } = require("../models");
const { storageModel } = require("../models");
let JWT_TOKEN = "";
const filePath = `${__dirname}/dump/track.mp3`;

beforeAll(async () => {
  await usersModel.deleteMany({});
  await storageModel.deleteMany({});
  const user = usersModel.create(testAuthRegister);
  JWT_TOKEN = await tokenSign(user);
});

describe("[STORAGE] This is the test for the route /api/storage", () => {
    
    test("This should return 404", async () => {
        const response = await request(app)
        .post("/api/auth/login")
        .send(testAuthLoginNoUser);

        expect(response.statusCode).toEqual(404);
    });

    
});