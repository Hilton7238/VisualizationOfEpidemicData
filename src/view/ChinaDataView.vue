<template>
  <Nav title="国内数据"></Nav>
  <china-data></china-data>
</template>

<script>
import ChinaData from "../components/ChinaData.vue";
import Nav from "../components/Nav.vue";
export default {
  components: { Nav, ChinaData },
};
</script>

<style scoped>
</style>