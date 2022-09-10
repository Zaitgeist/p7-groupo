<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>

<style scoped>
  body {
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(221, 229, 244);
  height: 100vh;
} </style> 