<template>
  <div v-for="(post, index) in posts.slice().reverse()" class="container">
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
            <h3 @mouseover="mouseover" @mouseleave="mouseleave">{{ post.username }}</h3>
            <div
              id="hovercard"
              v-show="showCard"
              @mouseover="cardHover"
              @mouseleave="cardLeave"
            >
              <div :class="['bg', { loaded: isLoaded }]"></div>
              <div class="content">
                <div class="name">
                  {{ post.username }} <br />
                  <a class="mail" :href="`mailto:${post.email}`">{{ post.email }} </a>
                </div>
              </div>
            </div>
            <div class="like">
              <button class="like-button" @click="postLike()">♥</button>
              <div class="liked">{{ post.likes }}</div>
            </div>
            <div
              class="edit-button"
              v-if="post.username == this.userInfo.name || this.userInfo.admin == 1"
            >
              <button class="button" @click="editMsg(index)" v-if="!isEditing">
                Modify
              </button>
              <button v-if="isEditing" class="button" @click="saveEdit(post._id)">
                Save
              </button>
              <button v-if="isEditing" class="button" @click="cancelEdit()">
                Cancel
              </button>

              <button class="button" @click="deletePost(post._id)">Delete</button>
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
  name: "Posts",
  data() {
    return {
      posts: [],
      userInfo: {},
      timeout: null,
      showCard: false,
      isLoaded: false,
      isEditing: false,
    };
  },
  mounted() {
    axios.get("http://localhost:5000/getposts").then((res) => {
      this.posts = res.data;
    });
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
      const file = this.$refs.file.files;
      this.file = file;
      console.log(this.file)
      if (!allowedTypes.includes(file.type)) {
        this.message = "Filetype is wrong!!";
      }
    },
    saveEdit(id) {
      const formData = new FormData();
      formData.append("file", this.file);
      axios.post("http://localhost:5000/upload", formData);
      let postObject = {
        img: this.file.name,
        text: this.text,
      };
      axios.post("http://localhost:5000/updatePost" + id, postObject).then;
    },
  },
    deletePost(id) {
      axios.delete("http://localhost:5000/post/" + id);
      this.posts = this.posts.filter((post) => id != post._id);
    },
    mouseover: function () {
      clearTimeout(this.timeout);
      var self = this;
      this.timeout = setTimeout(function () {
        self.showCard = true;
        setTimeout(function () {
          self.isLoaded = true;
        }, 500);
      }, 500);
    },
    mouseleave: function () {
      var self = this;
      this.timeout = setTimeout(function () {
        self.showCard = false;
        self.isLoaded = false;
      }, 100);
    },
    cardHover: function () {
      clearTimeout(this.timeout);
      this.showCard = true;
    },
    cardLeave: function () {
      var self = this;
      this.timeout = setTimeout(function () {
        self.showCard = false;
        self.isLoaded = false;
      }, 100);
    },
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
