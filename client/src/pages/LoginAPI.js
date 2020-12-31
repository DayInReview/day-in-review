import API from '../API';

const API_URL = "/users/login";

async function login(email, password) {
  try {
    const { data: res } = await API.post(API_URL, {
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