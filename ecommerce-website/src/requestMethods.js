import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDFlMDM2YzA2YWNlM2EyM2Y0YmY4NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MTU3MzE3MiwiZXhwIjoxNjkxODMyMzcyfQ.HIhUQgIw2DrPzhVUf89Lr7Ihth5RnZvpikCCljWgV7E";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: {
    token: `Bearer ${TOKEN}`,
  },
});
