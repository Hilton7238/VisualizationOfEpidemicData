<template>
  <div class="data-container">
    <slot name="nav"></slot>
    <slot name="data"></slot>
  </div>
</template>

<script>
export default {
  name: "Datacontainer",
};
</script>

<style scoped>
.data-container {
  display: flex;
  align-content: flex-start;
  flex-flow: row wrap;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 20px rgb(0 0 0 / 10%);
}
</style>