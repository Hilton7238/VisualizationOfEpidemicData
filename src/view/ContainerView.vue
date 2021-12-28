<template>
  <Nav title="防疫指南"></Nav>
  <div class="container-box">
    <container class="container">
      <template #text>
        <p>
          保持良好卫生习惯。购物或就餐时做好个人防护，戴好口罩，保持社交距离，咳嗽或打喷嚏时用纸巾遮住口、鼻，购物回家
          要洗手。
        </p>
      </template>
      <template #img>
        <img src="../assets/img/mask.png" alt="" />
      </template>
    </container>
    <container class="container">
      <template #text>
        <p>
          使用清洁的水和食材。购买食用新鲜的肉、水产品等食材，清洗加工食物、清洁烹饪用具和餐具以及洗手均要使用清洁的水。
        </p>
      </template>
      <template #img>
        <img src="../assets/img/water.png" alt="" />
      </template>
    </container>
    <container class="container">
      <template #text>
        <p>
          家庭制备食物注意关键环节卫生。特别是处理生的肉、禽、水产品等之后，要使用肥皂和流动水洗手至少20秒。购买、
          制作过程接触生鲜食材时避免用手直接揉眼鼻
        </p>
      </template>
      <template #img>
        <img src="../assets/img/wash.png" alt="" />
      </template>
    </container>
    <container class="container">
      <template #text>
        <p>
          生熟分开。生熟食品分开加工和存放，尤其在处理生肉、生水产品等食品时应格外小心，避免交叉污染。尽量不吃生的水产品等。
        </p>
      </template>
      <template #img>
        <img src="../assets/img/tableware.png" alt="" />
      </template>
    </container>
    <container class="container">
      <template #text>
        <p>煮熟烧透食物。加工肉、水产品等食物时要煮熟、烧透。</p>
      </template>
      <template #img>
        <img src="../assets/img/pot.png" alt="" />
      </template>
    </container>
    <container class="container">
      <template #text>
        <p>
          分别包装、分层存放食物。生的肉、水产品等食物在放入冰冻层之前最好先分割成小块、单独包装，包装袋要完整无破损，生、熟食物分层存放。
        </p>
      </template>
      <template #img>
        <img src="../assets/img/refrigerator.png" alt="" />
      </template>
    </container>
  </div>
</template>

<script>
import Container from "../components/Container.vue";
import Nav from "../components/Nav.vue";
export default {
  components: { Nav, Container },
  methods: {
    adapt() {
      if (window.screen.width < 1024) {
        let items = document.getElementsByClassName("container");
        for (let item of items) {
          item.style.width = "100%";
          item.style.marginRight = "0";
        }
      }
    },
    scale() {
      let items = document.getElementsByClassName("container");
      for (let item of items) {
        item.style.transform = "scale(1)";
      }
    },
  },
  mounted() {
    this.adapt();
    setTimeout(this.scale, 0);
  },
};
</script>

<style scoped>
p {
  font-size: 18px;
  color: #cccc33;
}
.container-box {
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  padding-top: 15px;
  width: 95%;
  background: #f0f0f0;
  border-radius: 30px;
  box-shadow: 0 2px 20px rgb(0 0 0 / 10%);
}
.container {
  width: 30%;
  margin-right: 40px;
  margin-bottom: 30px;
  position: relative;
  transition: all 0.8s linear;
  transform: scale(0);
}
.container:nth-child(3n) {
  margin-right: 0;
}
img {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 50%;
}
</style>