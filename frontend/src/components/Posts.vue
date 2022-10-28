<script>
import Post from "./Post.vue";
import axios from "axios";
export default {
  name: "Posts",
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    axios.get("http://localhost:5000/post/").then((res) => {
      this.posts = res.data;
    });
},
  methods: {
    deletePost(id) {
      const index = this.posts.findIndex((post) => post._id === id)
      this.posts.splice(index,1) 
    },
  },
  components: { Post },
};
</script>

<template>
  <Post
    v-for="post in posts.slice().reverse()"
    :post="post" :key="post._id" 
  >
  </Post>
</template>

<style scoped>
/* hover */
#hovercard {
  position: absolute;
  bottom: 10px;
  overflow: hidden;
  border: 1px solid #c0c0c0;
  z-index: 99;
  background-color: #fff;
}

.content {
  padding: 10px;
}
.name {
  font-size: 100%;
}
.username {
  font-weight: bold;
  margin-right: 10px;
}

@media only screen and (max-width: 600px) {
  .container {
    margin: 0% 0%;
    background: rgb(221, 229, 244);
    padding: 10px;
  }
}
</style>
