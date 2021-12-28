<template>
  <div class="container">
    <div class="string-box">
      <span id="string"></span>
    </div>
    <div class="box" @click="click">
      <span>点击查看</span>
      <img src="../assets/img/right.png" alt="" style="width: 20px" />
    </div>
  </div>
</template>

<script>
import Typed from "typed.js";

export default {
  mounted() {
    new Typed("#string", {
      strings: ["疫情数据可视化", "Epidemic data can be viewed as"],
      typeSpeed: 150,
      backSpeed: 180,
      loop: true,
      showCursor: true,
    });
  },
  methods: {
    click() {
      this.$router.push("/china");
    },
  },
};
</script>

<style scoped>
@keyframes move {
  0% {
    left: 75px;
  }
  50% {
    left: 78px;
  }
  100% {
    left: 81px;
  }
}
.container {
  width: 325px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 2rem;
  border-radius: 0.5rem;
  -webkit-backdrop-filter: blur(5px);
  color: rgba(12, 12, 12, 0.74);
}
#string {
  font-size: 20px;
  font-weight: 800;
}
.box {
  cursor: pointer;
  position: relative;
  border-radius: 25px;
  border: 2px solid #fff;
  width: 125px;
  height: 45px;
  margin-top: 20px;
}
.box span {
  position: absolute;
  left: 10px;
  top: 50%;
  font-size: 15px;
  font-weight: 400;
  transform: translate(0, -50%);
}
img {
  position: absolute;
  left: 75px;
  top: 50%;
  transform: translate(0, -48%);
  animation: move 1s infinite alternate linear;
}
</style>