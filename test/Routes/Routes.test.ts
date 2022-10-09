import app from "@root/server";
import request from "supertest";

describe("Testing router", () => {
  test("No version in route -> 404", async () => {
    const res = await request(app).post("/");
    expect(res.statusCode).toBe(404);
  });

  test("Good route with wrong METHOD -> 404", async () => {
    const res = await request(app).get("/v1/customer/create");
    expect(res.statusCode).toBe(404);
  });

  test("Route does not exist -> 404", async () => {
    const res = await request(app).get("/v1/customer/test");
    expect(res.statusCode).toBe(404);
  });

  test("Route with correct metohd throws error -> 403", async () => {
    const res = await request(app).post("/v1/customer/create").send({});
    expect(res.statusCode).toBe(403);
  });
});
