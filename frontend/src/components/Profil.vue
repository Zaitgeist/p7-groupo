<script>
import Navbar from "./Navbar.vue";
import axios from "axios";
export default {
  name: "Profil",
  data() {
    return {
      name: "",
      email: "",
      profilpic: "",
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.name = res.data.user.name;
        this.email = res.data.user.email;
        this.profilpic = res.data.user.profilPic;
      });
  },
  methods: {
    onSelect() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.file = file;
      if (!allowedTypes.includes(file.type)) {
        this.message = "Filetype is wrong!!";
      }
    },
    updateProfilpic() {
    user.update
    },
  },
  components: { Navbar },
};
</script>

<template>
  <Navbar />
  <div class="container">
    <div class="card">
      <div class="input-container">
      <label for="input-file">
        <img class="round" :src="this.profilpic" alt="user" />
       </label>
        <input type="file" ref="file" id="input-file" @change="onSelect" />
      </div>
      <h1>{{ this.name }}</h1>
      <h2>{{ this.email }}</h2>
      <button @click.prevent="updateProfilpic">Update</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin: 10px 0;
}

h2 {
  margin: 5px 0;
  text-transform: uppercase;
}

p {
  font-size: 14px;
  line-height: 21px;
}

.container {
  position: relative;
  margin: 0% 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.card {
  background-color: #a3a3a3;
  border-radius: 5px;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);
  color: #020202;
  padding-top: 30px;
  width: 350px;
  text-align: center;
  margin-top: 50px;
}

.card .round {
  width: 250px;
  height: 250px;
  border: 1px solid #d85230;
  border-radius: 50%;
  padding: 7px;
}

input {
  display: none;
}

.input-container :hover {
    cursor: pointer;
}
</style>
