const request = require("supertest");
const app = require("../app");
const { usersModel } = require("../models");

const testAuthLoginNoUser = {
    email: "noexiste@demo.com",
    password: "3naranjas",
};

const testAuthLoginNoPassword = {
    email: "demo@demo.com",
    password: "3naranjas",
};

const testAuthRegisterGo = {
    name: "Unit Test",
    age: 0,
    email: "test@test.com",
    password: "test_password",
};


/**
* This is executed before any test!
*/
beforeAll( async () => {
    await usersModel.deleteMany()

});

const testAuthLoginUser = {
    email: "test@test.com",
    password: "test_password",
};

const testAuthRegisterNoGo = {
    name: "Unit Test",
    email: "test@test.com",
    password: "test_password",
};

describe("[AUTH] This is the test for the route /api/auth", () => {
    test("This should return 404", async () => {
        const response = await request(app)
        .post("/api/auth/login")
        .send(testAuthLoginNoUser);

        expect(response.statusCode).toEqual(404);
    });

    // test("This should return 401", async () => {
    //     const response = await request(app)
    //     .post("/api/auth/login")
    //     .send(testAuthLoginNoPassword);

    //     expect(response.statusCode).toEqual(401);
    // });

    test("This should return 201", async () => {
        const response = await request(app)
        .post("/api/auth/register")
        .send(testAuthRegisterGo);

        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("data");
        expect(response.body).toHaveProperty("data.token");
        expect(response.body).toHaveProperty("data.user");

    });

    test("This should return 201", async () => {
        const response = await request(app)
        .post("/api/auth/login")
        .send(testAuthLoginUser);

        expect(response.statusCode).toEqual(201);
    });

    test("This should return 403", async () => {
        const response = await request(app)
        .post("/api/auth/register")
        .send(testAuthRegisterNoGo);

        expect(response.statusCode).toEqual(403);
    });
});