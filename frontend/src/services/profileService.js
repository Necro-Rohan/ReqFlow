import api from "../api/axios";

export const updateProfile = async (data) => {
  // console.log(data);
  const response = await api.patch("/user/profile", data);
  // console.log(response);
  return response.data;
};

export const updateEmail = async (email) => {
  const response = await api.patch("/user/profile/email", { email });
  // console.log(email, response);
  return response.data;
};

export const updatePassword = async (data) => {
  // console.log(data);
  // const verification = await api.get("/user/profile");
  // console.log(verification.data);
  const response = await api.patch("/user/profile/password", data);
  // console.log(response);
  return response.data;
};

export const deleteAccount = async () => {
  const response = await api.delete("/user/delete");
  return response.data;
};
