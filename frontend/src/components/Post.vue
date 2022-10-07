<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <img v-if="!isEditing" :src="post.img" :alt="post.img" />
        <input v-else type="file" class="img-form" ref="file" @change="onSelect" />
      </div>
      <div class="card-body">
        <p v-if="!isEditing">
          {{ post.text }}
        </p>
        <textarea v-else class="text-form" v-model="text"></textarea>
        <div class="user">
          <img :src="post.profilPic" alt="user" />
          <div class="user-name">
            <Hover v-bind:post="post" />
            <div class="like">
              <button class="like-button" @click="postLike()">♥</button>
              <div class="liked">{{ post.likes }}</div>
            </div>
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
</template>

<script>
import Hover from "./hover.vue";
import axios from "axios";
export default {
  created() {
    console.log(this.post);
  },
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
    postLike() {
      const id = this.id;
      const post = this.post;
      if (post.usersLiked.includes(this.userInfo.userId)) {
        let liked = {
          like: 0,
          userId: this.userInfo.userId,
        };
        axios.post("http://localhost:5000/post/" + id, liked);  
      } else {
        let liked = {
          like: 1,
          userId: this.userInfo.userId,
        };
        console.log(liked);
        axios.post("http://localhost:5000/post/" + id, liked);  
      }
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
      this.post = this.post.filter(() => id != id); // filter un objet ?????????
    },
  },

  components: { Hover },
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

.like :hover {
  color: red;
}

.liked {
  position: absolute;
  font-size: 13px;
  bottom: 10px;
  right: 25px;
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
</style>
