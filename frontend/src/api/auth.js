import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

import { AuthContext } from "../context/auth";

// export const useAuth = (userId) => {
//   const { setAuth } = useContext(AuthContext);
//   const { data, error } = useQuery(
//     "auth",
//     async () => {
//       try {
//         const res = await axiosInstance({
//           method: "GET",
//           url: `/users/${userId}`,
//         });

//         return res.data.data;
//       } catch (err) {
//         throw err;
//       }
//     },
//     {
//       onSuccess: (data) => {
//         setAuth({
//           userId: data["_id"],
//           firstName: data["firstName"],
//           lastName: data["lastName"],
//           imageUrl: data["imageUrl"],
//           email: data["email"],
//         });
//       },
//     }
//   );

//   return { data, error };
// };

export const loginAuth = () => {
  const axiosInstance = axios.create({
    // baseURL: "https://dabatech.herokuapp.com/api",
  });

  const { mutateAsync } = useMutation(({ email, password }) => {
    return axiosInstance({
      method: "POST",
      url: "/api/users/auth",
      data: {
        email: email,
        password: password,
      },
    });
  });

  return { login: mutateAsync };
};

export const signupAuth = () => {
  const axiosInstance = axios.create({
    // baseURL: "https://dabatech.herokuapp.com/api",
  });

  const { mutateAsync } = useMutation(
    ({ firstName, lastName, email, password }) => {
      return axiosInstance({
        method: "POST",
        url: "/api/users",
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
      });
    }
  );

  return { signup: mutateAsync };
};
