<template>
  <div class="container">
    <div class="form" >
      <div>
        <h1>Inscription</h1>
      </div>
      <div class="pseudo">Pseudonyme: <input type="text" v-model="name" required /></div>
      <span v-if="name">{{ msg.name }}</span>
      <div class="email">Email: <input type="text" v-model="email" required /></div>
      <span v-if="email">{{ msg.email }}</span>
      <div class="password">
        Mot de passe: <input type="password" v-model="password" required />
      </div>
      <span v-if="password">{{ msg.password }}</span>
      <div class="link">
        <router-link :to="{ path: '/' }"><p>Déja inscrit ?</p></router-link>
      </div>
      <div class="form-button">
        <button @click="register()" >S'inscrire</button>
      </div>
      {{ error }}
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
      msg: [],
      mlCorrect: 0,
      pwCorrect: 0,
      nmCorrect:0
    };
  },
  watch: {
    name(value) {
      this.name = value;
      this.validateName(value);
    },
    email(value) {
      this.email = value;
      this.validateEmail(value);
    },
    password(value) {
      this.password = value;
      this.validatePassword(value);
    },
  },
  methods: {
    validateName(value) {
      if (/^[a-zA-Z ]+$/.test(value) && value.length >= 3 && value.length <= 12) {
        this.msg["name"] = "";
        this.nmCorrect = 1
      } else {
        this.msg["name"] = "Un pseudonyme doit comporter entre 3 et 12 lettres et aucun caractères spéciaux";
        this.nmCorrect = 0
      }
    },
    validateEmail(value) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.msg["email"] = "";
        this.mlCorrect = 1
      } else {
        this.msg["email"] = "Veuillez renseigner une adresse mail valide !";
        this.mlCorrect = 0
      }
    },
    validatePassword(value) {
      if (value.length < 8 || value == null) {
        this.msg["password"] =
          "Le mot de passe doit contenir au moins 8 caractères";
          this.pwCorrect = 0
      } else if (value.length >= 8  && value.length !== null) {
        this.msg["password"] = "",
        this.pwCorrect = 1
      }
    },
    register() {
      if (this.pwCorrect == 1 && this.mlCorrect == 1 && this.nmCorrect == 1) {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      axios.post("http://localhost:5000/user/register", newUser).then;
      this.$router.push("/");
    } else {
      this.error ="Veuillez renseigner correctement les champs demandés !"
    }
    },
}
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
  width: 325px;
  max-width: 350px;
}

.pseudo,
.email,
.password {
  background: hsl(0deg 0% 100%);
  padding: 1em;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  color: hsl(0deg 0% 30%);
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

button :disabled{
  border: none;
  background-color: grey;
}


input {
  gap: 10px;
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
