import { Connection } from "typeorm";
import app from "../../src/server";
import { faker } from "@faker-js/faker";
import { agent as request } from "supertest";
import { testConn } from "../../src/utils/testing/testConn";

let connection: Connection;

const data = {
  name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: "IAUjshdjakyuh",
  confirmPassword: "a7sghdbkjan",
};

beforeAll(async () => {
  connection = await testConn();
});

afterAll(async () => {
  await connection.close();
});

describe("POST /register", () => {
  test("Should fail because passwords don't match", async () => {
    const response = await request(app)
      .post("/v1/auth/register")
      .send(data)
      .expect(403);
    expect(typeof response.body.errorType).toBe("string");
    expect(response.body.errors).toBeNull();
  });

  test("Sholud fail becasue email is not correct", async () => {
    data.password = faker.internet.password();
    data.confirmPassword = data.password;
    data.email = "email";
    const response = await request(app).post("/v1/auth/register").send(data);
    expect(response.status).toBe(403);
    expect(typeof response.body.errorType).toBe("string");
    expect(response.body.errors).toBeNull();
  });

  test("Should fail username is not provided", async () => {
    data.email = faker.internet.email();
    data.username = "";
    const response = await request(app).post("/v1/auth/register").send(data);

    expect(response.status).toBe(403);
    expect(typeof response.body.errorType).toBe("string");
    expect(response.body.errors).toBeNull();
  });

  test("Should pass", async () => {
    data.username = faker.internet.userName();
    const response = await request(app).post("/v1/auth/register").send(data);
    expect(response.status).toBe(200);
    expect(typeof response.body.message).toBe("string");
  });
});
