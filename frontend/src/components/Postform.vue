<template>
  <div class="container">
    <form enctype="multipart/form-data">
      <div class="form">
        <input type="file" class="img-form" ref="file" @change="onSelect" />
          <textarea class="text-form"  v-model="text"></textarea>
        <div class="button-form">
          <button @click="createPost">Post !</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Postform",
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
    onSelect() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.file = file;
      if (!allowedTypes.includes(file.type)) {
        this.message = "Filetype is wrong!!";
      }
    },
    createPost() {
      if (this.file == null) {
      let newPost = {
        profilPic: this.profilPic,
        userId: this.userId,
        username: this.name,
        img: this.file.name,
        text: this.text,
        email : this.email,
      };
      axios.post("http://localhost:5000/postform", newPost).then;
    } else if (this.file !== null) {
      const formData = new FormData();
      formData.append("file", this.file);
      axios.post("http://localhost:5000/upload", formData);
      let newPost = {
        profilPic: this.profilPic,
        userId: this.userId,
        username: this.name,
        img: this.file.name,
        text: this.text,
        email : this.email,
      };
      axios.post("http://localhost:5000/postform", newPost).then;
    }
    },
  },
};
</script>

<style scoped>
.container {
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
  border:1px solid black;
  resize: none;
  height: 100px;
}

@media only screen and (max-width: 600px) {
  .container {
  margin: 0% 0%;
  background: rgb(221, 229, 244);
  padding: 10px;
}
}
</style>
