import { login } from "./src/services/authService.js";

async function testLogin() {
  try {
    const user = await login(
      "manager@test.com",
      "123456"
    );

    console.log(user);
  } catch (error) {
    console.error(error.message);
  }
}

testLogin();