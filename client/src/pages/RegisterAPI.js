import API from '../API';

const API_URL = "/users/register";

async function register(name, email, password, password2) {
  try {
    const { data: user} = await API.post(API_URL, {
      name,
      email,
      password,
      password2
    });
    return {
      success: true,
      data: user
    };
  } catch (err) {
    console.log(err.response.data);
    return {
      success: false,
      data: err.response.data
    };
  }
}

export default { register };