<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { auth, firestore } from 'boot/firebase';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async login() {
      try {
        console.log('Attempting to log in with:', this.email, this.password);
        await auth.signInWithEmailAndPassword(this.email, this.password);
        console.log('Login successful!!!');
        // Check if user exists in 'staff_management' and get their role
        const user = auth.currentUser;
        const userDoc = await firestore.collection('staff_management').doc(user.email).get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          const role = userData.role;

          // Redirect based on role
          if (role === 'admin') {
            this.$router.push('/admin');
          } else if (role === 'staff') {
            this.$router.push('/check_in');
          } else {
            this.$router.push('/login'); // if login fails redirects to /login
          }
        } else {
          this.error = "User not found in staff management.";
        }
      } catch (error) {
        console.log(this.email);
        console.log(this.password);
        console.error("Login error:", error);
        this.error = error.message;
      }
    }
  }
};
</script>


<style scoped>
    .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    }

    .login h2 {
    margin-bottom: 20px;
    }

    .login input[type="email"],
    .login input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    }

    .login button {
    width: 100%;
    padding: 10px;
    background-color: #1976D2;
    color: #FFF0FB;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    }
</style>
  