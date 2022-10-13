<template>
  <div class="comment-form-container">
    <form enctype="multipart/form-data">
      <div class="form">
        <textarea class="text-form" v-model="text"></textarea>
        <div class="button-form">
          <button @click="createComment">Comment !</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "commentForm",
  props: {
    post: {} 
  },
  data() {
    return {};
  },
  mounted() {
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.userId = res.data.user.userId;
        this.name = res.data.user.name;
        this.profilPic = res.data.user.profilPic;
        this.email = res.data.user.email;
      });
  },
  methods: {
    createComment() {
        let newComment = {
          postId: this.post._id,
          profilPic: this.profilPic,
          userId: this.userId,
          username: this.name,
          text: this.text,
          email: this.email,
        };
        axios.post("http://localhost:5000/commentForm", newComment).then;
      }
    },
};
</script>

<style scoped>
.comment-form-container {
  margin: 0% 20%;
  background: rgb(221, 229, 244);
  padding: 10px;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.text-form {
  border: 1px solid black;
  resize: none;
  height: 100px;
}
</style>
