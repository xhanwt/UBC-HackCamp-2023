// AuthService.js
import axios from 'axios';

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:27017/api/login', {
        email,
        password,
      });

      // Handle successful login
      const user = response.data;
      return user;
    } catch (error) {
      // Handle login error
      console.error('Login failed', error.toJSON());
      throw error;
    }
  },

  signup: async (email, password, name, gender, healthCardNumber) => {
    try {
      const response = await axios.post('http://localhost:27017/api/signup', {
        email,
        password,
        name,
        gender,
        healthCardNumber,
      });

      // Handle successful signup
      return response.data;
    } catch (error) {
      // Handle signup error
      console.error('Signup failed', error.toJSON());
      throw error;
    }
  },
};

export default AuthService;