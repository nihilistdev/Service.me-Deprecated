import { Connection } from "typeorm";
import { Response } from "superagent";
import { User } from "@database/entities/user/user";
import app from "@root/server";
import argon2 from "argon2";
import { faker } from "@faker-js/faker";
import request from "supertest";
import { testConn } from "@utils/testing/testConn";

let connection: Connection;
let user = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  api_key: faker.git.commitSha(),
  is_active: true,
  confirmed: true,
};
let login: Response;

beforeAll(async () => {
  connection = await testConn();
  await User.create({
    ...user,
    password: await argon2.hash("Test123456789"),
  }).save();
  login = await request(app)
    .post("/v1/auth/login")
    .send({ emailOrUsername: user.username, password: "Test123456789" });
});

afterAll(async () => {
  await connection.close();
});

describe("POST /update/:id", () => {
  test("Should fail user is not authenticated", async () => {
    const response = await request(app).post("/v1/user/update/453").expect(403);
    expect(response.body.errorType).toBe("Raw");
  });

  test("Should fail user doesn't exist by this :id", async () => {
    const response = await request(app)
      .post("/v1/user/update/453")
      .send(user)
      .set("Cookie", [...login.header["set-cookie"]])
      .expect(403);

    expect(response.body.errorType).toBe("Unauthorized");
  });

  test("Should fail user is not in session", async () => {
    const response = await request(app)
      .post("/v1/user/update/1")
      .send(user)
      .set("Cookie", [...login.header["set-cookie"]])
      .expect(403);
    expect(response.body.errorType).toBe("Unauthorized");
  });

  test("Should pass", async () => {
    user.last_name = faker.name.lastName();
    await request(app)
      .post("/v1/user/update/2")
      .send(user)
      .set("Cookie", [...login.header["set-cookie"]])
      .expect(200);
  });
});
