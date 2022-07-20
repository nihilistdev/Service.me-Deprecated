import { DataSource } from "typeorm";
import { RegisterController } from "../../src/controllers/auth";
import { faker } from "@faker-js/faker";
import { Request, Response, NextFunction } from "express";
import { testConn } from "../../src/utils/testing/testConn";

let connection: DataSource;

describe("Register mutation", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction = jest.fn();

  beforeEach(async () => {
    connection = await testConn().initialize();
    req = {};
    res = {
      json: jest.fn(),
    };
  });

  afterAll(async () => {
    await connection.dropDatabase();
  });

  test("Register mutation fail -> No Data", async () => {
    req = {
      body: {
        name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
      },
      params: {},
    };
    res = {} as Response;

    const result = await RegisterController(
      req as Request,
      res as Response,
      next
    );
    expect(result).toBe(undefined);
  });

  test("Register function fail -> Password don't match", async () => {
    req = {
      body: {
        name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: "IAUjshdjakyuh",
      },
      params: {},
    };
    res = {};

    const result = await RegisterController(
      req as Request,
      res as Response,
      next
    );
    console.log(result);
  });
});
