<script>
import Navbar from "./Navbar.vue";
import axios from "axios";
import Postform from "./Postform.vue";
import Posts from "./Posts.vue";

export default {
  name: "Landing",
  data() {
    return {
    };
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/");
    }
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
    <Postform />
    <Posts />
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

</style>
