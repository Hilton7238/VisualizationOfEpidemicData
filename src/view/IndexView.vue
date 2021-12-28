<template>
  <div style="width: 100%; height: 100%" class="bg"></div>
  <index class="container"></index>
</template>

<script>
import Index from "../components/Index.vue";
export default {
  components: { Index },
};
</script>

<style scoped>
.bg {
  background: url("../assets/img/bg.jpg") repeat;
  background-size: cover;
  position: absolute;
  z-index: -1;
}
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>