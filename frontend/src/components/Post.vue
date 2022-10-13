<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <img v-if="!isEditing" :src="post.img" :alt="post.img" />
        <input v-else type="file" class="img-form" ref="file" @change="onSelect" />
      </div>
      <div class="card-body">
        <div class="user">
          <img :src="post.profilPic" alt="user" />
          <div class="user-name">
            <hover v-bind:post="post" />
            <div class="like-button" @click="postLike()">♥</div>
            <div class="liked">{{ post.likes }}</div>
            <p class="card-content" v-if="!isEditing">
              {{ post.text }}
            </p>
            <textarea v-else class="text-form" v-model="text"></textarea>
            <div
              class="edit-button"
              v-if="post.username == this.userInfo.name || this.userInfo.admin == 1"
            >
              <button class="button" @click="editMsg()" v-if="!isEditing">Modify</button>
              <button v-if="isEditing" class="button" @click="saveEdit(post._id)">
                Save
              </button>
              <button v-if="isEditing" class="button" @click="cancelEdit()">
                Cancel
              </button>
              <button class="button" @click="deletePost()">Delete</button>
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
      timeout: null,
      showCard: false,
      isLoaded: false,
      isEditing: false,
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/user", {
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
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.file = file;
      if (!allowedTypes.includes(file.type)) {
        this.message = "Filetype is wrong!!";
      }
    },
    saveEdit() {
      const id = this.id;
      const formData = new FormData();
      formData.append("file", this.file);
      axios.post("http://localhost:5000/upload", formData);
      let updatePost = {
        img: this.file.name,
        text: this.text,
      };
      axios.post("http://localhost:5000/updatePost/" + id, updatePost).then;
      this.post = this.post.filter(() => id != id);
    },
    deletePost() {
      const id = this.id;
      axios.delete("http://localhost:5000/post/" + id);
      this.$el.parentNode.removeChild(this.$el);
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
        console.log(liked);
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
  background-color: blueviolet;
}

.card-content {
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

.like-button {
  position: absolute;
  bottom: 50px;
  right: 20px;
  font-size: 20px;
}

.like-button :hover {
  color: red;
}
.liked {
  position: absolute;
  font-size: 20px;
  bottom: 50px;
  right: 35px;
}

/* edit */
.text-form {
  border: 1px solid black;
  height: 100px;
}

.img-form {
  margin: 10px 0px 10px 5px;
}

.edit-button {
  position: absolute;
  bottom: 10px;
  right: 20px;
}

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
