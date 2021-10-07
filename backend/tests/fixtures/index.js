import faker from "faker";
import { env } from "@config/environment";
import axios from 'axios'

export const makeFakeUser = (overrides) => {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  };
  return { ...user, ...overrides };
};

export const createUser = async (overrides) => {
    const res = await axios({
      url: `${env.getEnv().BASE_URL}/users`,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: makeFakeUser(overrides),
    });
    return res.data.data;
  };