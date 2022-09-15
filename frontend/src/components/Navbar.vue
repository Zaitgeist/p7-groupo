<script>
import axios from "axios";
export default {
  name: "Header",
  data() {
        return {
            name: "",
            email: "",
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
      });
  },
  methods: {
  logout() {
    localStorage.removeItem("token");
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
  },
}
};
</script>

<template>
  <div class="header">
    <router-link :to="{ path: '/landing' }" class="logo">Groupomania</router-link>
    <div class="header-right">
      <router-link :to="{ path: '/profil' }">{{ name }}</router-link>
      <a @click="logout">logout</a>
    </div>
  </div>
</template>

<style scoped>
  body {
  margin: 0;
  padding: 0;
}
.header {
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 20px 10px;
}
.header a {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
}

.header a.logo {
  max-height: 300px;
}

.header a:hover {
  background-color: #ddd;
  color: black;
}

.header-right {
  float: right;
}
</style>
