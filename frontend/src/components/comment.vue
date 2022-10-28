<template>
  <div class="comment-container">
    <div class="comment">
      <div class="comment-body">
        <div class="user">
          <img :src="comment.profilPic" alt="user" />
          <div class="username">
            {{ comment.username }}
          </div>
        </div>
            <div class="comment-content">
              {{ comment.text }}
            </div>
            <div
              class="comment-button"
              v-if="comment.userId == this.userInfo.userId || this.userInfo.admin == 1"
            >
              <div class="button-delete" @click="deleteComment()"><i class="far fa-trash-alt fa-fw"></i></div>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "comment",
  props: {
    comment: {},
  },
  data() {
    return {
      userInfo: {},
      id: this.comment._id,
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/user/userInfo", {
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
  border-top: black 1px solid;
}
.comment {
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 100%;
}
.comment-body {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: #EAEEFF;
}

.comment-content {
  margin: 5px;
  font-size: 16px;
  padding-right: 10%;
  word-break: break-all;
  
}
.user {
  flex-direction: column;
  justify-content: center;
  width: 50px;
  height: 100%;
  padding: 5px 5px 5px 5px;
  border-right: 1px #4E5166 solid;
}

.user img {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  margin-left: 5px;
  object-fit: cover;
  border: 1px solid #4E5166;
}
.username {
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;
  word-break: break-all;
}
.button-delete {
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
}
.button-delete :hover {
  color: #f21c00;
}

@media only screen and (max-width: 600px) {
  .container {
    margin: 0% 0%;
    background: #4E5166;
    padding: 10px;
  }
}

.button-delete {
  position: absolute;
  bottom: 15px;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
}
</style>
