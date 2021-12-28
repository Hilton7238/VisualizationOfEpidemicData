<template>
  <div class="container-box">
    <loading class="load" :class="{ hidden: isHidden }" ref="load"></loading>
    <div class="nav">
      <div class="nav-left" :class="{ navclick: isClick }" @click="navClick">
        国内数据
      </div>
      <div class="nav-right" :class="{ navclick: !isClick }" @click="navClick">
        <img src="../assets/img/location.png" style="width: 20px" />广东数据
      </div>
    </div>
    <div class="china-data" ref="china">
      <h3>国内数据</h3>
      <div class="view">
        <div class="main">
          <div id="main" style="height: 320px"></div>
        </div>
        <data-container class="data-container">
          <template #data>
            <div class="item">
              <h4>境外输入</h4>
              <span class="number" style="color: #ffa352">{{
                total.input
              }}</span
              ><br />
              <span class="add"
                >新增<span style="color: #ffa352"
                  >+{{ today.input }}</span
                ></span
              >
            </div>
            <div class="item">
              <h4>无症状感染者</h4>
              <span class="number" style="color: #791618">{{
                extData.noSymptom
              }}</span
              ><br />
              <span
                >新增<span style="color: #791618"
                  >+{{ extData.incrNoSymptom }}</span
                ></span
              >
            </div>
            <div class="item">
              <h4>现有确诊</h4>
              <span class="number" style="color: #e44a3d">{{
                chinaNowConfirm
              }}</span
              ><br />
              <span class="add"
                >新增<span style="color: #e44a3d"
                  >+{{ today.storeConfirm }}</span
                ></span
              >
            </div>
            <div class="item">
              <h4>累计确诊</h4>
              <span class="number" style="color: #a31d13">{{
                total.confirm
              }}</span
              ><br />
              <span class="add"
                >新增<span style="color: #a31d13"
                  >+{{ today.confirm }}</span
                ></span
              >
            </div>
            <div class="item">
              <h4>累计死亡</h4>
              <span class="number" style="color: #333">{{ total.dead }}</span
              ><br />
              <span class="add"
                >新增<span style="color: #333">+{{ today.dead }}</span></span
              >
            </div>
            <div class="item">
              <h4>累计治愈</h4>
              <span class="number" style="color: #34aa70">{{ total.heal }}</span
              ><br />
              <span class="add"
                >新增<span style="color: #34aa70">+{{ today.heal }}</span></span
              >
            </div>
            <span style="color: #a9a9a9; font-size: 18px; margin: 20px 20px"
              >截至:{{ dateTime }}</span
            >
          </template>
        </data-container>
      </div>
      <div id="line" style="height: 300px"></div>
      <div id="map" style="height: 600px"></div>
    </div>
    <div class="gd-data" ref="gd">
      <h3>广东数据</h3>
      <div class="view">
        <div class="gd-bar">
          <div id="gd-bar" style="height: 200px"></div>
        </div>
        <data-container class="data-container" style="height: 180px">
          <template #data>
            <div class="item">
              <h4>现有确诊</h4>
              <span class="number" style="color: #e44a3d">{{
                gdNowConfirm
              }}</span
              ><br />
              <span class="add"
                >新增<span style="color: #e44a3d"
                  >+{{ gdToday.storeConfirm }}</span
                ></span
              >
            </div>
            <div class="item">
              <h4>累计确诊</h4>
              <span class="number" style="color: #a31d13">{{
                gdTotal.confirm
              }}</span
              ><br />
              <span class="add"
                >新增<span style="color: #a31d13"
                  >+{{ gdToday.confirm }}</span
                ></span
              >
            </div>
            <div class="item">
              <h4>累计治愈</h4>
              <span class="number" style="color: #34aa70">{{
                gdTotal.heal
              }}</span
              ><br />
              <span class="add"
                >新增<span style="color: #34aa70"
                  >+{{ gdToday.heal }}</span
                ></span
              >
            </div>
            <span style="color: #a9a9a9; font-size: 18px; margin: 20px 20px"
              >截至:{{ dateTime }}</span
            >
          </template>
        </data-container>
      </div>
      <div id="gd-map" style="height: 500px"></div>
    </div>
  </div>
</template>

<script>
import request from "../network/request";
import DataContainer from "./DataContainer.vue";
import * as echarts from "echarts";
import china from "echarts/map/china.json";
import gd from "echarts/map/gd.json";
import Loading from "./loading";
echarts.registerMap("china", china);
echarts.registerMap("gd", gd);
let chinaBar;
let chinaLine;
let chinaMap;
let gdBar;
let gdMap;
export default {
  data() {
    return {
      isClick: true,
      today: {},
      total: {},
      extData: {},
      dateTime: "",
      dayList: {}, //国内近60天数据
      provinceData: [], //各省份数据
      //gdData
      gdTotal: {},
      gdToday: {},
      gdDataList: {},
      isHidden: false,
    };
  },
  components: {
    DataContainer,
    Loading,
  },
  computed: {
    chinaNowConfirm() {
      return this.total.confirm - this.total.dead - this.total.heal;
    },
    gdNowConfirm() {
      return this.gdTotal.confirm - this.gdTotal.dead - this.gdTotal.heal;
    },
  },
  created() {},
  methods: {
    updateBar() {
      let option = chinaBar.getOption();
      option.series[0].data[0] = this.total.input;
      option.series[0].data[1] = this.extData.noSymptom;
      option.series[0].data[2] = this.chinaNowConfirm;
      option.series[0].data[3] = this.total.confirm;
      option.series[0].data[4] = this.total.dead;
      option.series[0].data[5] = this.total.heal;
      option.series[1].data[0] = this.today.input;
      option.series[1].data[1] = this.extData.incrNoSymptom;
      option.series[1].data[2] = this.today.storeConfirm;
      option.series[1].data[3] = this.today.confirm;
      option.series[1].data[4] = this.today.dead;
      option.series[1].data[5] = this.today.heal;
      chinaBar.setOption(option);
      //设置广东数据
      option = gdBar.getOption();
      option.series[0].data[0] = this.gdNowConfirm;
      option.series[0].data[1] = this.gdTotal.confirm;
      option.series[0].data[2] = this.gdTotal.heal;
      option.series[1].data[0] = this.gdToday.storeConfirm;
      option.series[1].data[1] = this.gdToday.confirm;
      option.series[1].data[2] = this.gdToday.heal;
      gdBar.setOption(option);
    },
    updateLine() {
      let option = chinaLine.getOption();
      let i;
      for (i in this.dayList) {
        option.xAxis[0].data[i] = this.dayList[i].date;
        option.series[0].data[i] = this.dayList[i].today.confirm;
      }

      let sysDate = new Date();
      let today = sysDate.getDate();
      if (today < 10) {
        today = "0" + today;
      }
      i = parseInt(i);
      let date =
        sysDate.getFullYear() + "-" + (sysDate.getMonth() + 1) + "-" + today;
      option.xAxis[0].data[i + 1] = date;
      option.series[0].data[i + 1] = this.today.confirm;
      chinaLine.setOption(option);
    },
    updateMap() {
      let option = chinaMap.getOption();
      for (let item of this.provinceData) {
        let obj = { name: "", value: 0 };
        let obj1 = { name: "", value: 0 };
        if (
          item.name == "上海" ||
          item.name == "北京" ||
          item.name == "天津" ||
          item.name == "重庆"
        ) {
          obj1.name = obj.name = item.name + "市";
          obj.value = item.total.confirm - item.total.dead - item.total.heal;
          obj1.value = item.today.confirm;
        } else if (item.name == "广西") {
          obj1.name = obj.name = "广西壮族自治区";
          obj.value = item.total.confirm - item.total.dead - item.total.heal;
          obj1.value = item.today.confirm;
        } else if (item.name == "西藏") {
          obj1.name = obj.name = "西藏自治区";
          obj.value = item.total.confirm - item.total.dead - item.total.heal;
          obj1.value = item.today.confirm;
        } else if (item.name == "新疆") {
          obj1.name = obj.name = "新疆维吾尔自治区";
          obj.value = item.total.confirm - item.total.dead - item.total.heal;
          obj1.value = item.today.confirm;
        } else if (item.name == "宁夏") {
          obj1.name = obj.name = "宁夏回族自治区";
          obj.value = item.total.confirm - item.total.dead - item.total.heal;
          obj1.value = item.today.confirm;
        } else if (item.name == "内蒙古") {
          obj1.name = obj.name = "内蒙古自治区";
          obj.value = item.total.confirm - item.total.dead - item.total.heal;
          obj1.value = item.today.confirm;
        } else if (item.name == "香港" || item.name == "澳门") {
          obj1.name = obj.name = item.name;
          obj.value = item.total.confirm - item.total.dead - item.total.heal;
          obj1.value = item.today.confirm;
        } else {
          obj1.name = obj.name = item.name + "省";
          obj.value = item.total.confirm - item.total.dead - item.total.heal;
          obj1.value = item.today.confirm;
        }
        option.series[0].data.push(obj);
        option.series[1].data.push(obj1);
      }
      chinaMap.setOption(option);
      //设置广东数据
      option = gdMap.getOption();
      for (let i in this.gdDataList) {
        option.series[0].data.push({
          name: this.gdDataList[i].name + "市",
          value:
            this.gdDataList[i].total.confirm -
            this.gdDataList[i].total.dead -
            this.gdDataList[i].total.heal,
        });
        option.series[1].data.push({
          name: this.gdDataList[i].name + "市",
          value: this.gdDataList[i].today.confirm,
        });
      }
      gdMap.setOption(option);
    },
    navClick(that) {
      if (
        (that.srcElement.innerText == "国内数据" && this.isClick == true) ||
        (that.srcElement.innerText == "广东数据" && this.isClick == false)
      )
        return;

      if (this.isClick) {
        this.navTitle = "gd";
        this.$refs.china.style.opacity = 0;
        setTimeout(() => {
          this.$refs.china.style.display = "none";
          this.$refs.gd.style.display = "block";
          this.resizeGdView();
          setTimeout(() => {
            this.$refs.gd.style.opacity = 1;
          }, 280);
        }, 580);
      } else {
        this.navTitle = "china";
        this.$refs.gd.style.opacity = 0;
        setTimeout(() => {
          this.$refs.gd.style.display = "none";
          this.$refs.china.style.display = "block";
          this.resizeChinaView();
          setTimeout(() => {
            this.$refs.china.style.opacity = 1;
          }, 280);
        }, 580);
      }
      this.isClick = !this.isClick; //控制导航栏选择哪个
    },
    resizeGdView() {
      gdBar.resize();
      gdMap.resize();
    },
    resizeChinaView() {
      chinaBar.resize();
      chinaLine.resize();
      chinaMap.resize();
    },
    /* 解决路由跳转回来后原来的_echarts_instance还存在又在赋值多一次_echarts_instance导致
    图表出不来问题 */
    //适配移动端
    adapt() {
      if (window.screen.width <= 850) {
        let item = document.getElementsByClassName("view");
        for (let i of item) {
          i.style.display = "block";
        }
      }
    },
    removeAttribute() {
      document.getElementById("main").removeAttribute("_echarts_instance_");
      document.getElementById("line").removeAttribute("_echarts_instance_");
      document.getElementById("map").removeAttribute("_echarts_instance_");
      document.getElementById("gd-bar").removeAttribute("_echarts_instance_");
      document.getElementById("gd-map").removeAttribute("_echarts_instance_");
    },
  },
  mounted() {
    this.adapt(); //做适配
    this.removeAttribute();
    this.$refs.load.$el.style.top =
      document.documentElement.clientHeight / 2 + "px";
    request({
      method: "get",
      url: "",
      params: {},
    }).then((data) => {
      this.today = data.data.data.chinaTotal.today;
      this.total = data.data.data.chinaTotal.total;
      this.extData = data.data.data.chinaTotal.extData;
      this.dateTime = data.data.data.lastUpdateTime;
      this.gdToday = data.data.data.areaTree[2].children[3].today;
      this.gdTotal = data.data.data.areaTree[2].children[3].total;
      this.gdDataList = data.data.data.areaTree[2].children[3].children;
      this.dayList = data.data.data.chinaDayList;
      this.provinceData = data.data.data.areaTree[2].children;
      console.log(this.provinceData);
      this.updateBar(chinaBar, gdBar);
      this.updateLine(chinaLine);
      this.updateMap(chinaMap, gdMap);
      this.isHidden = !this.isHidden;
    });
    chinaBar = echarts.init(document.getElementById("main"));
    chinaBar.setOption({
      title: {
        text: "数据柱状图",
        x: "left",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["当前数据", "新增"],
      },
      xAxis: [
        {
          data: [
            "境外输入",
            "无症状感染者",
            "现有确诊",
            "累计确诊",
            "累计死亡",
            "累计治愈",
          ],
          type: "category",
          axisLabel: {
            interval: 0,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      series: [
        {
          name: "当前数据",
          type: "bar",
          data: [],
          barMinHeight: 2,
          label: {
            normal: {
              show: true,
            },
          },
          animation: false,
        },
        {
          name: "新增",
          type: "bar",
          data: [],
          barMinHeight: 2,
          label: {
            normal: {
              show: true,
            },
          },
          animation: false,
        },
      ],
    });
    chinaLine = echarts.init(document.getElementById("line"));
    chinaLine.setOption({
      title: {
        text: "国内近60天确诊数据折线图",
        x: "center",
      },
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 45,
          },
        },
      ],

      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          type: "line",
          data: [],
          label: {
            normal: {
              show: true,
            },
          },
          lineStyle: {
            normal: {
              color: "#DC143C",
              width: 2,
            },
          },
          itemStyle: {
            normal: {
              color: "#DC143C",
            },
          },
          animation: false,
        },
      ],
      grid: {
        left: "3%",
        right: "1%",
      },
    });
    chinaMap = echarts.init(document.getElementById("map"));
    chinaMap.setOption({
      title: {
        text: "现有确诊地图",
        x: "center",
      },
      tooltip: {
        rigger: "item",
        formatter: function (params) {
          var res = params.name + "<br />";
          //定义一个变量来保存series数据系列
          var myseries = chinaMap.getOption().series;
          //循环遍历series数据系列
          for (var i = 0; i < myseries.length; i++) {
            //在内部继续循环series[i],从data中判断：当地区名称等于params.name的时候就将当前数据和名称添加到res中供显示
            for (var k = 0; k < myseries[i].data.length; k++) {
              //console.log(myseries[i].data[k].name);
              //如果data数据中的name和地区名称一样
              if (myseries[i].data[k].name == params.name) {
                //将series数据系列每一项中的name和数据系列中当前地区的数据添加到res中
                res +=
                  myseries[i].name + ":" + myseries[i].data[k].value + "<br />";
              }
            }
          }
          return res;
        },
      },
      toolbox: {
        show: true,
        orient: "horizontal",
        feature: {
          dataView: { readOnly: false },
        },
      },
      //设置标注(采用透明度区分层级)
      visualMap: {
        type: "piecewise",
        pieces: [
          { gt: 500, color: "Maroon" },
          { gt: 250, lte: 500, color: "darkred", colorAlpha: 0.8 },
          { gt: 200, lte: 250, color: "red", colorAlpha: 1 },
          { gt: 150, lte: 200, color: "red", colorAlpha: 0.8 },
          { gt: 100, lte: 150, color: "red", colorAlpha: 0.6 },
          { gt: 50, lte: 100, color: "red", colorAlpha: 0.4 },
          { gt: 0, lte: 50, color: "red", colorAlpha: 0.2 },
          { lte: 0, gte: 0, color: "green" },
        ],
      },
      series: [
        {
          name: "现有确诊数",
          type: "map",
          map: "china",
          roam: true, //开启鼠标平移缩放
          label: {
            normal: {
              show: true,
              width: 16,
            },
          },
          data: [],
          zoom: 1.2, //设置地图默认大小
          animation: false,
        },
        {
          name: "新增确诊数",
          type: "map",
          map: "china",
          roam: true, //开启鼠标平移缩放
          label: {
            normal: {
              show: true,
              width: 16,
            },
          },
          data: [],
          animation: false,
        },
      ],
    });
    gdBar = echarts.init(document.getElementById("gd-bar"));
    gdBar.setOption({
      title: {
        text: "数据柱状图",
        x: "left",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["当前数据", "新增"],
      },
      xAxis: [
        {
          data: ["现有确诊", "累计确诊", "累计治愈"],
          type: "category",
          axisLabel: {
            interval: 0,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      series: [
        {
          name: "当前数据",
          type: "bar",
          data: [],
          barMinHeight: 2,
          label: {
            normal: {
              show: true,
            },
          },
          animation: false,
        },
        {
          name: "新增",
          type: "bar",
          data: [],
          barMinHeight: 2,
          label: {
            normal: {
              show: true,
            },
          },
          animation: false,
        },
      ],
    });
    gdMap = echarts.init(document.getElementById("gd-map"));
    gdMap.setOption({
      title: {
        text: "现有确诊地图",
        x: "center",
      },
      tooltip: {
        rigger: "item",
        formatter: function (params) {
          var res = params.name + "<br />";
          //定义一个变量来保存series数据系列
          var myseries = gdMap.getOption().series;
          //循环遍历series数据系列
          for (var i = 0; i < myseries.length; i++) {
            //在内部继续循环series[i],从data中判断：当地区名称等于params.name的时候就将当前数据和名称添加到res中供显示
            for (var k = 0; k < myseries[i].data.length; k++) {
              //console.log(myseries[i].data[k].name);
              //如果data数据中的name和地区名称一样
              if (myseries[i].data[k].name == params.name) {
                //将series数据系列每一项中的name和数据系列中当前地区的数据添加到res中
                res +=
                  myseries[i].name + ":" + myseries[i].data[k].value + "<br />";
              }
            }
          }
          return res;
        },
      },
      toolbox: {
        show: true,
        orient: "horizontal",
        feature: {
          dataView: { readOnly: false },
        },
      },
      //设置标注(采用透明度区分层级)
      visualMap: {
        type: "piecewise",
        pieces: [
          { gt: 25, color: "darkred" },
          { gt: 20, lte: 25, color: "red", colorAlpha: 1 },
          { gt: 15, lte: 20, color: "red", colorAlpha: 0.8 },
          { gt: 10, lte: 15, color: "red", colorAlpha: 0.6 },
          { gt: 5, lte: 10, color: "red", colorAlpha: 0.4 },
          { gt: 0, lte: 5, color: "red", colorAlpha: 0.2 },
          { lte: 0, gte: 0, color: "green" },
        ],
      },
      series: [
        {
          name: "现有确诊数",
          type: "map",
          map: "gd",
          roam: true, //开启鼠标平移缩放
          label: {
            normal: {
              show: true,
              width: 16,
            },
          },
          data: [],
          animation: false,
        },
        {
          name: "新增确诊数",
          type: "map",
          map: "gd",
          roam: true, //开启鼠标平移缩放
          label: {
            normal: {
              show: true,
              width: 16,
            },
          },
          data: [],
          animation: false,
        },
      ],
    });
    window.onresize = () => {
      if (this.navTitle == "china") {
        this.resizeChinaView();
      } else {
        this.resizeGdView();
      }
    };
  },
};
</script>

<style scope>
.container-box {
  margin: 10px auto;
  padding: 15px 15px;
  width: 95%;
  background: #f0f0f0;
  border-radius: 30px;
  position: relative;
  box-shadow: 0 2px 20px rgb(0 0 0 / 10%);
}
.load {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
.hidden {
  display: none;
}
.item {
  flex: 0 0 33%;
  text-align: center;
  margin: 20px 0;
}
.number {
  font-size: 30px;
}
.add {
  color: gray;
}
.china-data,
.gd-data {
  margin-top: 30px;
  text-align: center;
  transition: all 0.6s;
}
.gd-data {
  display: none;
}
.nav {
  display: flex;
}
.nav-right,
.nav-left {
  font-size: 18px;
  text-align: center;
  flex: 1;
  transition: all 0.2s;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  color: #333;
  font-size: 20px;
  border-radius: 30px;
}
.nav-right img {
  display: inline-block;
  margin: -2px 10px;
}
.navclick {
  background: #c7c7c7;
}
.view {
  display: flex;
  margin-top: 30px;
}
.data-container,
.gd-bar,
.main {
  flex: 1;
}
.data-container {
  height: 300px;
}
#line,
#gd-map,
#map {
  margin-top: 30px;
}
</style>