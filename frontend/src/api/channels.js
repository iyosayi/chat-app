import { useQuery, useMutation, useQueryClient } from "react-query";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth";

export const allChannels = () => {
  const { auth } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: "https://dabatech.herokuapp.com/api",
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  const { data, error } = useQuery("allChannels", async () => {
    try {
      const res = await axiosInstance({
        method: "GET",
        url: "/channels",
      });
      return res.data.data;
    } catch (err) {
      throw err;
    }
  });

  return { data, error };
};

export const createChannel = () => {
  const queryClient = useQueryClient();
  const { auth } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL: "https://dabatech.herokuapp.com/api",
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  const { mutateAsync } = useMutation(
    ({ name, description, createdBy }) => {
      return axiosInstance({
        method: "POST",
        url: "channels",
        data: {
          name: name,
          description: description,
          createdBy: auth["_id"],
        },
      });
    }, 
    {
      onSuccess: () => queryClient.invalidateQueries("allChannels"),
      onError: (err) => console.log(err),
    }
  );

  return { createNewChannel: mutateAsync };
};
