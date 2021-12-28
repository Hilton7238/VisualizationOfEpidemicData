<template>
  <div class="nav">
    <a href="/guide" class="left">防疫指南</a>
    <span class="center">当前：{{ title }}</span>
    <div class="right">
      <div class="top">
        选择数据&nbsp;&nbsp;
        <img
          src="../assets/img/down.png"
          alt=""
          class="nav-img"
          style="width: 15px"
        />
      </div>
      <div class="down">
        <ul>
          <li @click="linkTo">国内数据</li>
          <li @click="linkTo">世界数据</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: {
    title: String,
  },
  methods: {
    linkTo(that) {
      if (
        (that.srcElement.innerText == "国内数据" &&
          this.$route.meta.title == "国内数据") ||
        (that.srcElement.innerText == "世界数据" &&
          this.$route.meta.title == "世界数据")
      )
        return;
      if (this.$route.meta.title == "国内数据") {
        this.$router.push("/world");
      } else {
        this.$router.push("/china");
      }
    },
  },
};
</script>

<style scoped>
.nav {
  position: relative;
  height: 45px;
  width: 100%;
  background-color: #003366;
  color: #cccccc;
  line-height: 45px;
  font-size: 16px;
}
.left {
  position: absolute;
  left: 10px;
  color: #cccccc;
  font-size: 16px;
}
.center {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.right {
  position: absolute;
  right: 10px;
  width: 90px;
}
.nav-img {
  position: absolute;
  top: 11%;
}
.top {
  width: 90px;
}
.down {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, 0.3);
  visibility: hidden;
  width: 90px;
}
.down ul li {
  text-align: center;
  color: black;
}
.nav-img {
  transition: all 0.3s;
}
.down ul li {
  transition-property: background-color;
  transition-duration: 0.3s;
}
.right,
.down ul li {
  cursor: pointer;
}
.right:hover .nav-img {
  transform: rotate(-180deg);
}
.right:hover .down {
  visibility: visible;
}
.down ul li:hover {
  background-color: rgb(212, 220, 240);
}
</style>