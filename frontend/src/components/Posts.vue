/<script>
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
    axios.get("http://localhost:5000/getposts").then((res) => {
      this.posts = res.data;
      
    })
  },

components: { Post }

};

</script>

<template>
        <Post v-for="post, index in posts.slice().reverse()"  v-bind:post="post" v-bind:index="index"> </Post>
</template>

<style scoped>
.container {
  position: relative;
  margin: 0% 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.card {
  background-color: #fff;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 100%;
}
.card-header img {
  width: 100%;
  object-fit: cover;
}
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5px;
}

.card-body p {
  font-size: 13px;
}
.user {
  display: flex;
  margin-top: 10px;
}

.user img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  object-fit: cover;
}

.like {
  position: absolute;
  font-size: 20px;
  bottom: 30px;
  right: 20px;
}

.liked {
  position: absolute;
  font-size: 13px;
  bottom: 10px;
  right: 20px;
}

/* edit */
.text-form {
  border: 1px solid black;
  resize: none;
  height: 100px;
  width: 90%;
}

.img-form {
margin: 10px 0px 10px 5px;
}

.edit-button {
  position: absolute;
  bottom: 10px;
  right: 20px;
}
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
</style>
