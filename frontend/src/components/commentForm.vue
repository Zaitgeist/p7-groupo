<template>
  <div class="comment-form-container">
    <form enctype="multipart/form-data">
      <div class="form">
        <textarea class="text-form" :maxlength="max" placeholder="Write something!" v-model="text" v-on:keydown="textChange"></textarea>
        {{ error }}
        <div class="button-form">
          <div class="count" v-text="(max - text.length)"></div>
          <button  @click="createComment()">Comment !</button>
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
    return {
      error: "",
      max: 140,
      text: '',
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/user/userInfo", {
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
    textChange(){
      if (this.text == "") {
        this.error = "";
      }
    },
    createComment() {
      if (this.text == "") {
        this.error ="Veuillez renseigner un commentaire"
        event.preventDefault();
      } else if (this.text !== null) {
      let newComment = {
          postId: this.post._id,
          profilPic: this.profilPic,
          userId: this.userId,
          username: this.name,
          text: this.text,
          email: this.email,
        };
        axios.post("http://localhost:5000/comment/", newComment).then;
      }
    }
}
};
</script>

<style scoped>
.comment-form-container {
  margin: 0% 20%;
  background: #7F8299;
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
  height: 50px;
  background-color: #EAEEFF;
  font-size: 20px;
}

.button-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 600;
}

Button {
	background-color:#4E5166;
	border-radius:3px;
	border:1px solid #0b0e07;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-size:15px;
	padding:1px 20px;
	text-decoration:none;
	text-shadow:0px 1px 0px #263666;
}
Button:hover {
	background-color:#625D78;
}
Button:active {
	position:relative;
	top:1px;
}

@media only screen and (max-width: 600px) {
  .comment-form-container {
    margin: 0% 0%;
    background: #7F8299;
    padding: 10px;
  }
}
</style>
