<script>
import Comment from "./Comment.vue";
import axios from "axios";
export default {
  name: "Comments",
  props: {
    post: {},
  },
  data() {
    return {
    id: this.post._id,
    comments: [],
    };
  },
  mounted() {
    const id = this.id;
    console.log("coucou")
    axios.get("http://localhost:5000/getcomments/"+ id).then((res) => {
      this.comments = res.data;
    });
  },

  components: { Comment },
};
</script>

<template>
  <Comment
    v-for="(comment, index) in comments.slice().reverse()"
    v-bind:comment="comment"
    v-bind:index="index">
  </Comment>
</template>

<style scoped>

@media only screen and (max-width: 600px) {

}
</style>
