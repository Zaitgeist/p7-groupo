<template>
  <div v-for="post in posts.slice().reverse()" class="container">
    <div class="card">
      <div class="card-header">
        <img :src="post.img" :alt="post.img"/>
      </div>
      <div class="card-body">
        <p>
          {{post.text}}
        </p>
        <div class="user">
          <img :src="post.profilPic" alt="user" />
          <div class="user-name">
            <h3>{{post.username}}</h3>
            <div class="like">♥</div>
            <div class="liked">User1,User2,User3</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Post",
  data() {
    return {
      posts: [],
    };
  },
mounted() {
    axios
      .get("http://localhost:5000/getposts")
      .then((res) => {
      this.posts = res.data;
      console.log(this.posts)
      })
  }
};
</script>

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
  font-size: 25px;
  bottom: 30px;
  right: 20px;
}

.liked {
  position: absolute;
  font-size: 13px;
  bottom: 10px;
  right: 20px;
}
</style>
