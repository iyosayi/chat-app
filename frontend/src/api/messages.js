import { useQuery } from "react-query";
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth";

export const channelMessages = (channelId) => {
  const { auth } = useContext(AuthContext);

  const axiosInstance = axios.create({
    // baseURL: "https://dabatech.herokuapp.com/api",
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  const { data, error, isLoading, isStale } = useQuery(
    "channelMessages",
    async () => {
      try {
        const res = await axiosInstance({
          method: "GET",
          url: `/api/channels/chat/${channelId}`,
        });
        return res.data.data;
      } catch (err) {
        throw err;
      }
    }
  );

  return { data, error, isLoading, isStale };
};
