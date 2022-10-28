<script>
import Navbar from "./Navbar.vue";
import axios from "axios";
export default {
  name: "Profil",
  data() {
    return {
      userInfo: {},
      errorFileType: "",
      file: "",
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
    onSelect() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      if (allowedTypes.includes(file.type)) {
        this.errorFileType = "";
        this.file = file;
      } else if (!allowedTypes.includes(file.type)) {
        this.file = this.userInfo.profilPic;
        this.errorFileType = "Seul les fichiers formats jpg/png/gif sont acceptés";
      }
      let reader = new FileReader();
      reader.onload = (e) => {
        this.userInfo.profilPic = e.target.result;
      };
      reader.readAsDataURL(this.file);
    },
    updateProfilpic() {
      if (this.file == "") {
        this.errorFileType = "Selectionner une nouvelle image de profil !";
        return;
      } else {
        const id = this.userInfo.userId;
        const userUpdate = new FormData();
        if (this.name !== undefined) {
          userUpdate.append("name", this.name);
        }
        userUpdate.append("file", this.file);
        axios.post("http://localhost:5000/user/" + id, userUpdate);
      }
    },
  },
  components: { Navbar },
};
</script>

<template>
  <Navbar />
  <div class="container">
    <div class="card">
      <div class="input-container">
        <label for="input-file">
          <img class="round" :src="this.userInfo.profilPic" alt="user" />
        </label>
        <input
          type="file"
          accept="image/x-png,image/jpeg"
          ref="file"
          id="input-file"
          @change="onSelect"
        />
      </div>
      {{ errorFileType }}
      <h1>{{ this.userInfo.name }}</h1>
      <h2>{{ this.userInfo.email }}</h2>
      <button @click.prevent="updateProfilpic">Update</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin: 10px 0;
  text-transform: uppercase;
}

h2 {
  margin: 5px 0;
  text-transform: uppercase;
}

p {
  font-size: 14px;
  line-height: 21px;
}

.container {
  position: relative;
  margin: 0% 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.card {
  background-color: #7f8299;
  border-radius: 5px;
  box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.75);
  color: #020202;
  padding-top: 30px;
  width: 350px;
  text-align: center;
  margin-top: 50px;
}

.card .round {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  padding: 7px;
}

.card .round:hover {
  color: #000;
  opacity: 0.3;
  z-index: 100;
}

input {
  display: none;
}

.input-container :hover {
  cursor: pointer;
}

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
  margin-bottom: 10px;
}
Button:hover {
  background-color: #625d78;
}
Button:active {
  position: relative;
  top: 1px;
}
</style>
