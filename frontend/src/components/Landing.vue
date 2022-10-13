<script>
import Navbar from "./Navbar.vue";
import axios from "axios";
import Postform from "./Postform.vue";
import Posts from "./Posts.vue";

export default {
  name: "Landing",
  data() {
    return {
      name: "",
      email: "",
    };
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
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
      localStorage.clear();
      this.$router.push("/");
    },
  },
  components: { Navbar, Postform, Posts },
};
</script>
<template>
  <Navbar />
  <div>
    <Postform />
    <Posts />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
