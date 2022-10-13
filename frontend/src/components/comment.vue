<template>
  <div class="comment-container">
    <div class="comment">
      <div class="comment-body">
        <div class="user">
          <img :src="comment.profilPic" alt="user" />
          <div class="username">
          {{ comment.username }}
            <p class="comment-content">
              {{ comment.text }} toto
            </p>
            <div
              class="button"
            >
              <button class="button" @click="deleteComment()">TOTO</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
  },
  name: "Comment",
  props: {
    comment: {},
  },
  data() {
    return {
      id: this.comment._id,
      userInfo: {},
    };
  },
  mounted() {
    console.log(comment.username)
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.userInfo = res.data.user;
      });
  },
  methods: {
    deleteComment() {
      const id = this.id;
      axios.delete("http://localhost:5000/comment/" + id);
      this.$el.parentNode.removeChild(this.$el);
    },
  },
  components: {},
};
</script>

<style scoped>
.comment-container {
  position: relative;
  margin: 0% 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.comment {
  background-color: #fff;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 100%;
}
.comment-header img {
  width: 100%;
  object-fit: cover;
}
.comment-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 5px;
  background-color: blueviolet;
}

.comment-content {
  font-size: 18px;
}
.user {
  display: flex;
  margin: 10px 10px 0px;
}

.user img {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-right: 10px;
  object-fit: cover;
}

/* edit */

.button {
  background: linear-gradient(to bottom, #f02809 5%, #f21c00 100%);
  background-color: #f02809;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 5px 8px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #7a2a1d;
}
.button:hover {
  background-color: #f21c00;
}

@media only screen and (max-width: 600px) {
  .container {
    margin: 0% 0%;
    background: rgb(221, 229, 244);
    padding: 10px;
  }
}
</style>
