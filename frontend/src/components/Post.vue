<template>
  <div class="container">
    <div class="card">
      <div v-if="isEditing">
        <!-- post edit-->
        <div class="card-header-edit">
        <label for="input-file-edit">
            <div class="inputBtn"> Image...</div>         
          <input
            type="file"
            accept="image/*"
            class="img-form"
            ref="file"
            id="input-file-edit"
            @change="onSelect"
          />
        </label>
          {{ errorFileTypeEdit }}
        </div>
        <div class="card-body-edit">
          <div class="card-content-edit">
            <textarea class="text-form" :maxlength="max" v-model="text"></textarea>
            <div class="count" v-text="max - text.length"></div>
          </div>
          <div
            class="edit-button-edition"
            v-if="post.userId == this.userInfo.userId || this.userInfo.admin == 1"
          >
            <div class="msgButton" @click="saveEdit(post._id)">
              <i class="far fa-save fa-fw"></i>
            </div>
            <div class="cancelButton" @click="cancelEdit()">
              <i class="far fa-window-close fa-fw"></i>
            </div>
            <div class="deleteButton" @click="deletePost()">
              <i class="far fa-trash-alt fa-fw"></i>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- post affichage-->
        <div class="card-header">
          <img :src="post.img" :alt="post.img" />
        </div>
        <div class="card-body">
          <div class="user">
            <img :src="post.profilPic" alt="user" />
            <div class="user-name">
              <hover v-bind:post="post" />
            </div>
          </div>
          <div class="card-content">
            {{ post.text }}
          </div>
          <div class="controls">
            <div class="like-button" @click="postLike()">
              <i class="far fa-heart"></i>
            </div>
            <div class="liked">{{ post.likes }}</div>
          </div>
          <div
            class="edit-button"
            v-if="post.userId == this.userInfo.userId || this.userInfo.admin == 1"
          >
            <div class="msgButton" @click="editMsg()">
              <i class="far fa-edit fa-fw"></i>
            </div>
            <div class="deleteButton" @click="deletePost()">
              <i class="far fa-trash-alt fa-fw"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <commentForm :post="post"></commentForm>
  <comments :post="post"></comments>
</template>

<script>
import comments from "./comments.vue";
import commentForm from "./commentForm.vue";
import hover from "./hover.vue";
import axios from "axios";
export default {
  name: "Post",
  props: {
    post: {},
  },
  data() {
    return {
      id: this.post._id,
      userInfo: {},
      max: 140,
      text: "",
      isEditing: false,
      isLoaded: false,
      errorFileTypeEdit:""
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
    editMsg() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
    },
    onSelect() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      const file = this.$refs.file.files[0];
      if (allowedTypes.includes(file.type)) {
        this.errorFileTypeEdit = "";
        this.file = file;
      } else if (!allowedTypes.includes(file.type)) {
        this.file = ""
        this.errorFileTypeEdit = "Seul les fichiers formats jpg/png/gif sont acceptés";
      }
    },
    saveEdit() {
      confirm("Etes vous sur de vouloir modifier ce post ?");
      const id = this.id;
      const postInfo = new FormData();
      if (this.text !== undefined) {
        postInfo.append("text", this.text);
        this.post.text = this.text;
      }
      if (this.file !== undefined) {
        postInfo.append("file", this.file);
        axios.post("http://localhost:5000/post/update/" + id, postInfo);
        let reader = new FileReader();
        reader.onload = (e) => {
          this.post.img = e.target.result;
        };
        reader.readAsDataURL(this.file);
      }
      this.isEditing = false;
    },
    deletePost() {
      const id = this.id;
      axios.delete("http://localhost:5000/post/" + id);
      this.$parent.deletePost(id);
    },
    postLike() {
      const id = this.id;
      const post = this.post;
      if (post.usersLiked.includes(this.userInfo.userId)) {
        let liked = {
          like: 0,
          userId: this.userInfo.userId,
        };
        axios.post("http://localhost:5000/post/" + id, liked);
        post.likes -= 1;
        post.usersLiked.pop(this.userInfo.userId);
      } else {
        let liked = {
          like: 1,
          userId: this.userInfo.userId,
        };
        axios.post("http://localhost:5000/post/" + id, liked);
        post.likes += 1;
        post.usersLiked.push(this.userInfo.userId);
      }
    },
  },

  components: { commentForm, comments, hover },
};
</script>

<style scoped>
.container {
  position: relative;
  margin: 0% 20%;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #4E5166;
}
.card {
  background-color: #fff;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 100%;
}

.card-header{
 margin-top: -20px;
 background-color: #EAEEFF;
}
.card-header img {
  max-height: 600px;
  width: 100%;
  object-fit: contain;
  margin-top: 18px;
}
.card-body {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: #7F8299;
  margin-top: -4px;
  border-bottom:1px #4E5166 solid;
  border-top:1px #4E5166 solid;
}

.card-content {
  margin: 5px;
  font-size: 20px;
  padding-right: 20%;
  word-break: break-all;
}
.user {
  flex-direction: column;
  justify-content: center;
  width: 50px;
  height: 100%;
  padding: 10px 10px 0px;
  border-right: 1px #4E5166 solid;
}

.user img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  object-fit: cover;
  border: 1px solid #4E5166;
}

.user-name {
  font-size: 14px;
  text-transform: uppercase;
  text-align: center;
  word-break: break-all;
}
.like-button {
  cursor: pointer;
  position: absolute;
  bottom: 50px;
  right: 20px;
  font-size: 20px;
}

.like-button :hover {
  font-weight: 600;
  color: red;
}
.liked {
  position: absolute;
  font-size: 20px;
  bottom: 50px;
  right: 45px;
}

/* edit */
.card-header-edit {
  padding: 10px 0px 0px 10px;
  background-color: #4E5166;
}
.card-body-edit {
  background: #4E5166;
  padding: 10px;
}

.text-form {
  border: 1px solid black;
  width: 100%;
  resize: none;
  height: 50px;
}

.img-form {
  margin: 10px 0px 10px 5px;
}
input {
  display: none;
}

label {
  background-color: #4e5166;
  border-radius: 3px;
  border: 1px solid #0b0e07;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-size: 15px;
  padding: 1px 20px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #263666;
}
label:hover {
  background-color: #625d78;
}
label:active {
  position: relative;
  top: 1px;
}

.msgButton,
.saveButton {
  position: absolute;
  bottom: 10px;
  right: 45px;
  font-size: 20px;
  cursor: pointer;
}
.deleteButton {
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
}

.cancelButton {
  position: absolute;
  bottom: 15px;
  right: 70px;
  font-size: 20px;
  cursor: pointer;
}

.msgButton:hover,
.saveButton:hover,
.deleteButton:hover,
.cancelButton:hover {
  color: #f21c00;
}

@media only screen and (max-width: 600px) {
  .container {
    margin: 0% 0%;
    padding: 10px;
  }
}

.like-button {
  cursor: pointer;
  position: absolute;
  bottom: 50px;
  right: 20px;
  font-size: 20px;
}

.like-button :hover {
  font-weight: 600;
  color: red;
}
.liked {
  position: absolute;
  font-size: 20px;
  bottom: 50px;
  right: 45px;
}

.msgButton,
.saveButton {
  position: absolute;
  bottom: 10px;
  right: 45px;
  font-size: 20px;
  cursor: pointer;
}
.deleteButton {
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: 20px;
  cursor: pointer;
}

.cancelButton {
  position: absolute;
  bottom: 10px;
  right: 70px;
  font-size: 20px;
  cursor: pointer;
}
</style>
