<template>
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
</template>

<script>
export default {
  created () {
  },
  name: "hover",
  props: {
    post: {},
  },
  data() {
    return {
      timeout: null,
      showCard: false,
      isLoaded: false,
      isEditing: false,
    };
  },
  methods: {
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
}
};
</script>

<style>
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