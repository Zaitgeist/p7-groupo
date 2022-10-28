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
      .get("http://localhost:5000/user/userInfo", {
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
    <router-link :to="{ path: '/landing' }" ><img src="../assets/icon-left-font-monochrome-black.png" class="logo" alt="logo groupomania"></router-link>
    <div class="header-right">
      <router-link :to="{ path: '/profil' }">{{ name }}</router-link>
      <a @click="logout">logout</a>
    </div>
  </div>
</template>

<style scoped>

.header {
  overflow: hidden;
  background-color: #7F8299;
  padding: 5px 5px;
  height: 30px;
  box-shadow: 0 2px 3px -2px rgb(10, 10, 10);
}
.header a {
  text-align: center;
  padding: 0px 5px;
  text-decoration: none;
  font-size: 18px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: bold;
}

.header a:visited {
  color: black;
}
.header a:hover {
  color: #EAEEFF;
}

.logo {
height: 30px;
}

.header-right {
  margin-top: 3px;
  float: right;
}
</style>
