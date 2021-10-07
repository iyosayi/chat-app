import { expect } from "chai";
import supertest from "supertest";
import { createUser } from "./fixtures";
import { env } from "@config/environment";
const { BASE_URL } = env.getEnv();
const api = supertest(BASE_URL);

describe("Channel controller", () => {
  it("creates a channel successfully", async () => {
    const userResponse = await createUser();
    const token = userResponse.token;
    const res = await api
      .post("/channels")
      .set({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: "Channel 1",
        description: "some description",
        createdBy: userResponse.user._id,
      });

    expect(res.body.data.name).to.be.a("string");
    expect(res.body.data.description).to.be.a("string");
    expect(res.body.data.createdBy).to.be.equal(userResponse.user._id);
  });

  it("gets a channel by id", async () => {
    const userResponse = await createUser();
    const token = userResponse.token;
    const res = await api
      .post("/channels")
      .set({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: "Channel 2",
        description: "some description",
        createdBy: userResponse.user._id,
      });
    const getChannelResponse = await api
      .get(`/channels/${res.body.data._id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(getChannelResponse.body.data.name).to.be.equal("Channel 2");
  });

  it("gets all channels", async () => {
    const userResponse = await createUser();
    const token = userResponse.token;
    const res = await api
      .get("/channels")
      .set("Authorization", `Bearer ${token}`);
    expect(res.body.data).to.be.an("array");
  });
});
