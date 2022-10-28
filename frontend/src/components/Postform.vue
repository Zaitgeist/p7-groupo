<template>
  <div class="container">
    <form enctype="multipart/form-data">
      <div class="form">
        <div class="input-container">
          <label for="input-file">
            <div class="inputBtn"> Image...</div>         
          <input
            type="file"
            accept="image/*"
            class="img-form"
            ref="file"
            id="input-file"
            @change="onSelect"
          />
        </label>
        </div>
        {{ errorFileType }}
        <textarea
          class="text-form"
          :maxlength="max"
          placeholder="Write something!"
          v-model="text"
          v-on:keydown="textChange"
        ></textarea>
        {{ error }}
        <div class="button-form">
          <div class="count" v-text="max - text.length"></div>
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
    return {
      max: 140,
      text: "",
      file: "",
      error: "",
      errorFileType: "",
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
    textChange() {
      if (this.text == "") {
        this.error = "";
      }
    },
    onSelect() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      const file = this.$refs.file.files[0];
      if (allowedTypes.includes(file.type)) {
        this.errorFileType = "";
        this.file = file;
      } else if (!allowedTypes.includes(file.type)) {
        this.file = "";
        this.errorFileType = "Seul les fichiers formats jpg/png/gif sont acceptés";
      }
    },
    createPost() {
      if (this.text == "" && this.file == "") {
        this.error = "Veuillez remplir un champ !";
        event.preventDefault();
      } else if (this.text !== "" || this.file !== "") {
        const postInfo = new FormData();
        postInfo.append("profilPic", this.profilPic);
        postInfo.append("userId", this.userId);
        postInfo.append("username", this.name);
        postInfo.append("text", this.text);
        postInfo.append("email", this.email);
        postInfo.append("file", this.file);
        axios.post("http://localhost:5000/post/", postInfo);
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0% 20%;
  background: #7f8299;
  padding: 10px;
  box-shadow: inset 0 2px 3px -2px rgb(10, 10, 10);
}
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  display: none;
}

label,
Button {
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
Button:hover {
  background-color: #625d78;
}
Button:active {
  position: relative;
  top: 1px;
}

.text-form {
  border: 1px solid black;
  font-size: 16px;
  resize: none;
  height: 50px;
  background-color: #eaeeff;
}

.button-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 600;
}

@media only screen and (max-width: 600px) {
  .container {
    margin: 0% 0%;
    background: #7f8299;
    padding: 10px;
  }
}
</style>
