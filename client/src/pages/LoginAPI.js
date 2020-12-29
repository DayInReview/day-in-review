import axios from 'axios';

const API_URL = "http://localhost:5000/api/users/login";

async function login(email, password) {
  const { data: res } = await axios.post(API_URL, {
    email,
    password
  });
  if (res.success) {
    return res.token;
  }
}

export default { login };