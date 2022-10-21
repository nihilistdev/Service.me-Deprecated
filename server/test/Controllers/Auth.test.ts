import { Connection } from "typeorm";
import app from "@root/server";
import { faker } from "@faker-js/faker";
import { agent as request } from "supertest";
import { testConn } from "@utils/testing/testConn";

let connection: Connection;
let token: string;

const data = {
  first_name: faker.name.firstName(),
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
    token = response.body.data.token;
  });
});

describe("POST /verify-account", () => {
  test("Should fail token is not valid", async () => {
    const response = await request(app)
      .post("/v1/auth/verify-account/123")
      .expect(403);
    expect(response.status).toBe(403);
    expect(response.body.errorType).toBe("Raw");
  });

  test("Should fail token is expired", async () => {
    const response = await request(app)
      .post("/v1/auth/verify-account/7c77528a-80c1-4431-ac73-e1d28c4e6d4c")
      .expect(403);
    expect(response.status).toBe(403);
    expect(response.body.errorType).toBe("Raw");
  });

  test("Should pass", async () => {
    await request(app)
      .post("/v1/auth/verify-account/" + token)
      .expect(200);
  });
});

describe("POST /login", () => {
  test("Should fail req is empty", async () => {
    const response = await request(app)
      .post("/v1/auth/login")
      .send({})
      .expect(403);
    expect(response.status).toBe(403);
    expect(response.body.errorType).toBe("Validation");
  });

  test("Should fail email is not correct", async () => {
    const response = await request(app)
      .post("/v1/auth/login")
      .send({
        emailOrUsername: "test@email.com",
        password: "12345678900",
      })
      .expect(407);
    expect(response.status).toBe(407);
    expect(response.body.errorType).toBe("General");
  });

  test("Should fail password is not correct", async () => {
    const response = await request(app).post("/v1/auth/login").send({
      emailOrUsername: data.email,
      password: "1265317823",
    });
    expect(response.status).toBe(407);
    expect(response.body.errorType).toBe("General");
  });

  test("Should pass with email", async () => {
    const response = await request(app)
      .post("/v1/auth/login")
      .send({
        emailOrUsername: data.email,
        password: data.password,
      })
      .expect(200);
    expect(response.body.data).toHaveProperty("id");
    expect(typeof response.body.message).toBe("string");
  });

  test("Should pass with usernmae", async () => {
    const response = await request(app)
      .post("/v1/auth/login")
      .send({
        emailOrUsername: data.username,
        password: data.password,
      })
      .expect(200);

    expect(response.body.data).toHaveProperty("id");
    expect(typeof response.body.message).toBe("string");
  });
});

describe("POST /forgot-password", () => {
  test("Should fail email is empty", async () => {
    const response = await request(app)
      .post("/v1/auth/forgot-password")
      .send({
        emai: "",
      })
      .expect(403);

    expect(response.body.errorType).toBe("Validation");
  });

  test("Should fail email doesn't exist", async () => {
    const response = await request(app)
      .post("/v1/auth/forgot-password")
      .send({
        email: "email.email",
      })
      .expect(403);
    expect(response.body.errorType).toBe("Validation");
  });

  test("Should pass", async () => {
    const response = await request(app)
      .post("/v1/auth/forgot-password")
      .send({ email: data.email })
      .expect(200);
    expect(typeof response.body.data.token).toBe("string");
    token = response.body.data.token;
  });
});

describe("POST /change-password", () => {
  test("Should fail token is not correct", async () => {
    const response = await request(app)
      .post("/v1/auth/change-password/873hkdjnasd")
      .expect(403);
    expect(response.body.errorType).toBe("Validation");
  });

  test("Should fail passwords not matching", async () => {
    const response = await request(app)
      .post("/v1/auth/change-password/" + token)
      .send({
        newPassword: "anhs8d7",
        confirmNewPassword: "m a8s90dua",
      })
      .expect(403);
    expect(response.body.errorType).toBe("Validation");
  });

  test("Should pass", async () => {
    const password = faker.internet.password();
    const response = await request(app)
      .post("/v1/auth/change-password/" + token)
      .send({
        newPassword: password,
        confirmNewPassword: password,
      })
      .expect(200);
    expect(typeof response.body.message).toBe("string");
  });
});
