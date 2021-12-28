<template>
  <div>
    <div class="loading-box">
      <span class="loading1 loading"></span>
      <span class="loading2 loading"></span>
      <span class="loading3 loading"></span>
      <span class="loading4 loading"></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@keyframes load {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.5);
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
.loading-box {
  position: relative;
  background-color: rgba(0, 0, 0, 0.1);
  width: 150px;
  height: 150px;
  border-radius: 0.8rem;
}
.loading {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transform-origin: 50% 50%;
  margin: -10px -10px;
}

.loading1 {
  left: 20%;
  background-color: red;
  animation: load 1s infinite alternate linear;
}
.loading2 {
  left: 40%;
  background-color: green;
  animation: load 1s 0.35s infinite alternate linear;
}
.loading3 {
  left: 60%;
  background-color: blue;
  animation: load 1s 0.7s infinite alternate linear;
}
.loading4 {
  left: 80%;
  background-color: yellow;
  animation: load 1s 0.9s infinite alternate linear;
}
</style>