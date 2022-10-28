<script>
import comment from "./comment.vue";
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
    axios.get("http://localhost:5000/comment/"+ id).then((res) => {
      this.comments = res.data;
    });
  },

  components: { comment },
};
</script>

<template>
  <comment
    v-for="(comment, index) in comments.slice().reverse()"
    v-bind:comment="comment">
  </comment>
</template>

<style scoped>


@media only screen and (max-width: 600px) {
  .comment-container {
    margin: 0% 0%;
    background: #4E5166;
    padding: 10px;
  }
}
</style>
