<template>
  <div class="outbox">
    <div class="innerbox">
      <slot name="text"></slot>
      <slot name="img"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.outbox {
  background-color: #336699;
  padding-top: 20px;
  padding-bottom: 30px;
  border-radius: 1.8rem;
  height: 350px;
}
.innerbox {
  padding: 30px 30px;
  height: 85%;
  background-color: #ffff;
  border-radius: 1.8rem;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
</style>