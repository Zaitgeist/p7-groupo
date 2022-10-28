<template>
  <div class="container">

    <div class="form">
      <img src="../assets/icon-left-font-monochrome-white.png">
      <div>
        <h1>Connexion</h1>
      </div>
      <div class="email">Email: <input type="text" v-model="email" /></div>
      <div class="password">
        Mot de Passe: <input type="password" v-model="password" />
      </div>
      <router-link :to="{ path: '/register' }"><p>Créer un compte</p></router-link>
      <button @click="login">login</button>
      {{ error }}
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password,
      };
      axios.post("http://localhost:5000/user/login", user).then((res) => {
        if (res.status === 200) {
          console.log(res.status)
          localStorage.setItem("token", res.data.token);
          axios.defaults.headers = { Authorization: res.data.token };
          this.$router.push("/landing");
        } else {if (res.statut === 401) {
          console.log(res.status)
        }
      }
      });
    },
  },
};
</script>

<style scoped>
.container {
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #4E5166;
  height: 100vh;
}
.form {
  gap: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.email,
.password {
  background: hsl(0deg 0% 100%);
  padding: 1em;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  color: hsl(0deg 0% 30%);
}

img {
  width: 350px;
}

a {
  color: black;
  font-size: 20px;
}
button {
  border-radius: 20px;
  border: 1px solid #fd2d01;
  background-color: #fd2d01;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  cursor: pointer;
}

button:active {
  transform: scale(0.95);
}

input {
  gap: 15px;
  width: 240px;
  height: 10px;
  padding: 5px;
  font-size: 16px;
  color: #5e6472;
  outline: none;
  border: none;
  border-radius: 0px 5px 5px 0px;
}
</style>
