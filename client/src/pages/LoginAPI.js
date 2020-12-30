import axios from 'axios';

const API_URL = "http://localhost:5000/api/users/login";

async function login(email, password) {
  try {
    const { data: res } = await axios.post(API_URL, {
      email,
      password
    });
    if (res.success) {
      return {
        success: true,
        data: res.token
      };
    }
  } catch (err) {
    console.log(err.response.data);
    return {
      success: false,
      data: err.response.data
    };
  }
}

export default { login };