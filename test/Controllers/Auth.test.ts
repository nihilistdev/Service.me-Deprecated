import { DataSource } from "typeorm";
import { app } from "../../src";
import { faker } from "@faker-js/faker";
import { agent as request } from "supertest";
import { testConn } from "../../src/utils/testing/testConn";

let connection: DataSource;

const data = {
  name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: "IAUjshdjakyuh",
  confirmPassword: "a7sghdbkjan",
};

beforeAll(async () => {
  connection = await testConn().initialize();
});

afterAll(async () => {
  await connection.destroy();
});

describe("POST /register", () => {
  test("Should fail because passwords don't match", (done) => {
    request(app)
      .post("/v1/auth/register")
      .send(data)
      .expect(403)
      .then((response) => {
        expect(typeof response.body.errorType).toBe("string");
        expect(response.body.errors).toBeNull();
        done();
      });
    done();
  });

  test("Sholud fail becasue email is not correct", (done) => {
    data.password = faker.internet.password();
    data.confirmPassword = data.password;
    data.email = "email";
    request(app)
      .post("/v1/auth/register")
      .send(data)
      .then((response) => {
        expect(response.status).toBe(403);
        expect(typeof response.body.errorType).toBe("string");
        expect(response.body.errors).toBeNull();
        done();
      });
    done();
  });
});
