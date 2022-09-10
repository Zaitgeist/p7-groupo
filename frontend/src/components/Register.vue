<template>
  <div class="container">
    <div class="form">
      <div>
        <h1>Inscription</h1>
      </div>
      <div class="pseudo">Pseudonyme: <input type="text" v-model="name" /></div>
      <div class="email">Email: <input type="text" v-model="email" /></div>
      <div class="password">PASSWORD: <input type="password" v-model="password" /></div>
      <div class="link">
        <router-link :to="{ path: '/' }"><p>Déja inscrit ?</p></router-link>
      </div>
      <div class="form-button">
        <button @click="register">S'inscrire</button>
        {{ error }}
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    register() {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      axios.post("http://localhost:5000/register", newUser).then;
      this.error = "";
      this.$router.push("/");
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
  background: rgb(221, 229, 244);
  height: 100vh;
}
.form {
  gap: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.pseudo,
.email,
.password {
  background: hsl(0deg 0% 100%);
  box-shadow: 0 0 2em hsl(231deg 62% 94%);
  padding: 1em;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  color: hsl(0deg 0% 30%);
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
