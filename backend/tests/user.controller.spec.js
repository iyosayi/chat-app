import { expect } from "chai";
import supertest from "supertest";
import { makeFakeUser } from "./fixtures";
import { env } from "@config/environment";
const { BASE_URL } = env.getEnv();
const api = supertest(BASE_URL);

describe("User controller", () => {
  it("creates a user successfully", async () => {
    const user = makeFakeUser({ password: "password1234!!" });
    const res = await api
      .post("/users")
      .set("Content-Type", "application/json")
      .send(user);
    expect(res.body.data.user.email).to.be.a("string");
    expect(res.body.data.user.firstName).to.be.a("string");
    expect(res.body.data.user.lastName).to.be.a("string");
    expect(res.body.data.user.password).not.to.exist;
    expect(res.body.data.token).to.be.a("string");
  });

  it("logs a user in succesfully", async () => {
    const user = makeFakeUser({ password: "password1234!!" });
    const res = await api
      .post("/users")
      .set("Content-Type", "application/json")
      .send(user);
    expect(res.body.data.user.email).to.be.a("string");
    expect(res.body.data.user.firstName).to.be.a("string");
    const loginResponse = await api
      .post("/users/auth")
      .set("Content-Type", "application/json")
      .send({ email: user.email, password: user.password });
    expect(loginResponse.body.data.user.email).to.be.equal(
      res.body.data.user.email
    );
    expect(loginResponse.body.data.token).to.be.a("string");
    expect(loginResponse.body.data.token.length).to.be.greaterThan(10);
  });

  it("gets a user by id", async () => {
    const user = makeFakeUser({ password: "password1234!!" });
    const res = await api
      .post("/users")
      .set({ "Content-Type": "application/json" })
      .send(user);
    const token = res.body.data.token;
    const id = String(res.body.data.user._id);
    expect(res.body.data.user.email).to.be.a("string");
    expect(res.body.data.user.firstName).to.be.a("string");
    const getUserResponse = await api
      .get(`/users/${id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(getUserResponse.body.data.email).to.be.equal(
      res.body.data.user.email
    );
  });
});
