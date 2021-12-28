<template>
  <div class="container-box">
    <loading class="load" :class="{ hidden: isHidden }" ref="load"></loading>
    <div class="view">
      <div class="main">
        <div id="bar" style="height: 320px"></div>
      </div>
      <data-container class="data-container">
        <template #data>
          <div class="item">
            <h4>累计确诊</h4>
            <span class="number" style="color: #e44a3d">{{ totalConfirm }}</span
            ><br />
          </div>
          <div class="item">
            <h4>现有确诊</h4>
            <span class="number" style="color: #a31d13">{{ nowConfirm }}</span
            ><br />
          </div>
          <div class="item">
            <h4>今日确诊</h4>
            <span class="number" style="color: #800000">{{ todayConfirm }}</span
            ><br />
          </div>
          <div class="item">
            <h4>今日治愈</h4>
            <span class="number" style="color: #2e8b57">{{ todayHeal }}</span
            ><br />
          </div>
          <div class="item">
            <h4>累计治愈</h4>
            <span class="number" style="color: #34aa70">{{ totalHeal }}</span
            ><br />
          </div>
          <div class="item">
            <h4>累计死亡</h4>
            <span class="number" style="color: #333">{{ totalDead }}</span
            ><br />
          </div>
          <span style="color: #a9a9a9; font-size: 18px; margin: 20px 20px"
            >截至:{{ dateTime }}</span
          >
        </template>
      </data-container>
    </div>
    <div id="nowConfirm-map" style="height: 800px"></div>
    <div class="view">
      <div id="newlyBar" style="height: 320px"></div>
      <div id="confirmBar" style="height: 320px"></div>
    </div>
  </div>
</template>
<script>
import DataContainer from "./DataContainer.vue";
import request from "../network/request";
import * as echarts from "echarts";
import Loading from "./loading";
require("echarts/map/world");
let bar;
let map;
let newlyBar;
let confirmBar;
export default {
  data() {
    return {
      wordData: [],
      dateTime: "",
      isHidden: false,
    };
  },
  components: {
    DataContainer,
    Loading,
  },
  methods: {
    updateBar() {
      let option = bar.getOption();
      option.series[0].data[0] = this.totalConfirm;
      option.series[0].data[1] = this.nowConfirm;
      option.series[0].data[2] = this.todayConfirm;
      option.series[0].data[3] = this.todayHeal;
      option.series[0].data[4] = this.totalHeal;
      option.series[0].data[5] = this.totalDead;
      bar.setOption(option);
    },
    updateNowConfirmMap() {
      let option = map.getOption();
      for (let item of this.wordData) {
        let obj = { name: "", value: 0 };
        let obj1 = { name: "", value: 0 };
        obj1.name = obj.name = item.name;
        obj.value = item.total.confirm - item.total.heal - item.total.dead;
        obj1.value = item.today.confirm;
        option.series[0].data.push(obj);
        option.series[1].data.push(obj1);
      }
      map.setOption(option);
    },
    updateNewlyBar() {
      let data = [];
      for (let item of this.wordData) {
        if (item.today.confirm == null) {
          continue;
        }
        data.push({ name: item.name, value: item.today.confirm });
      }
      data.sort((item1, item2) => {
        return item2.value - item1.value;
      });
      data = data.splice(0, 10);
      let option = newlyBar.getOption();
      for (let i in data) {
        option.xAxis[0].data[i] = data[i].name;
        option.series[0].data[i] = data[i].value;
      }
      newlyBar.setOption(option);
    },
    updateConfrimBar() {
      let data = [];
      for (let item of this.wordData) {
        if (
          item.total.confirm == null ||
          item.total.heal == null ||
          item.total.dead == null
        ) {
          continue;
        }
        data.push({
          name: item.name,
          value: item.total.confirm - item.total.heal - item.total.dead,
        });
      }
      data.sort((item1, item2) => {
        return item2.value - item1.value;
      });
      data = data.splice(0, 10);
      let option = confirmBar.getOption();
      for (let i in data) {
        option.xAxis[0].data[i] = data[i].name;
        option.series[0].data[i] = data[i].value;
      }
      confirmBar.setOption(option);
    },
    updateView() {
      bar.resize();
      map.resize();
      newlyBar.resize();
      confirmBar.resize();
    },
    /* 解决路由跳转回来后原来的_echarts_instance还存在又在赋值多一次_echarts_instance导致
    图表出不来问题 */
    removeAttribute() {
      document.getElementById("bar").removeAttribute("_echarts_instance_");
      document
        .getElementById("nowConfirm-map")
        .removeAttribute("_echarts_instance_");
      document.getElementById("newlyBar").removeAttribute("_echarts_instance_");
      document
        .getElementById("confirmBar")
        .removeAttribute("_echarts_instance_");
    },
    adapt() {
      let screenWidth = window.screen.width;
      if (screenWidth <= 850) {
        let item = document.getElementsByClassName("view");

        for (let i of item) {
          i.style.display = "block";
        }
      }
      if (screenWidth <= 500) {
        let spans = document.getElementsByClassName("number");
        for (let i of spans) {
          i.style.fontSize = "22px";
        }
      }
    },
  },
  created() {},
  mounted() {
    this.adapt();
    this.removeAttribute();
    //设置load高度为屏幕可视区中间
    this.$refs.load.$el.style.top =
      document.documentElement.clientHeight / 2 + "px";
    bar = echarts.init(document.getElementById("bar"));
    bar.setOption({
      title: {
        text: "数据柱状图",
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
          data: [
            "累计确诊",
            "现有确诊",
            "今日确诊",
            "今日治愈",
            "累计治愈",
            "累计死亡",
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
      series: [
        {
          type: "bar",
          data: [],
          barMinHeight: 2,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              color: function (params) {
                // build a color map as your need.
                var colorList = [
                  "#e44a3d",
                  "#a31d13",
                  "#800000",
                  "#2E8B57",
                  "#34aa70",
                  "#333",
                ];
                return colorList[params.dataIndex];
              },
            },
          },
          animation: false,
        },
      ],
    });
    map = echarts.init(document.getElementById("nowConfirm-map"));
    map.setOption({
      title: {
        text: "现有确诊世界地图",
        x: "center",
      },
      tooltip: {
        rigger: "item",
        formatter: function (params) {
          var res = params.name + "<br />";
          //定义一个变量来保存series数据系列
          var myseries = map.getOption().series;
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
          { gt: 10000000, color: "Maroon" },
          {
            gt: 5000000,
            lte: 10000000,
            color: "darkred",
            colorAlpha: 0.8,
          },
          { gt: 1000000, lte: 5000000, color: "red", colorAlpha: 1 },
          { gt: 100000, lte: 1000000, color: "red", colorAlpha: 0.8 },
          { gt: 10000, lte: 100000, color: "red", colorAlpha: 0.6 },
          { gt: 5000, lte: 10000, color: "red", colorAlpha: 0.4 },
          { gt: 0, lte: 5000, color: "red", colorAlpha: 0.2 },
          { gte: -1, lte: 0, color: "green" },
        ],
        formatter: function (value) {
          if (value == 5000) {
            return "5000-10000(含10000)";
          } else if (value == 10000) {
            return "1万-10万(含10万)";
          } else if (value == 100000) {
            return "10万-100万(含100万)";
          } else if (value == 1000000) {
            return "100万-500万(含500万)";
          } else if (value == 5000000) {
            return "500万-1千万(含1千万)";
          } else if (value == 10000000) {
            return "大于1000万";
          } else if (value == 0) {
            return "0-5000(含5000)";
          } else {
            return "0";
          }
        },
      },
      series: [
        {
          name: "现有确诊数",
          type: "map",
          mapType: "world",
          roam: true,
          label: {
            normal: {
              show: false,
              textStyle: {
                fontSize: 16,
              },
            },
          },
          data: [],
          zoom: 1.2,
          animation: false,
        },
        {
          name: "新增确诊数",
          type: "map",
          mapType: "world",
          roam: true,
          label: {
            normal: {
              show: false,
              textStyle: {
                fontSize: 16,
              },
            },
          },
          data: [],
          animation: false,
        },
      ],
    });
    newlyBar = echarts.init(document.getElementById("newlyBar"));
    newlyBar.setOption({
      title: {
        text: "新增确诊前十国家",
        x: "center",
      },
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "20%",
      },
      xAxis: [
        {
          data: [],
          type: "category",
          axisLabel: {
            interval: 0,
            rotate: "",
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
          type: "bar",
          barGap: "50%",
          data: [],
          barMinHeight: 2,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              color: function (params) {
                // build a color map as your need.
                var colorList = [
                  "rgba(139,26,26,1)",
                  "rgba(139,26,26,0.9)",
                  "rgba(139,26,26,0.8)",
                  "rgba(139,35,35,1)",
                  "rgba(139,35,35,0.9)",
                  "rgba(139,35,35,0.8)",
                  "rgba(205,38,38,1)",
                  "rgba(205,38,38,0.9)",
                  "rgba(205,38,38,0.8)",
                  "rgba(205,38,38,0.7)",
                ];
                return colorList[params.dataIndex];
              },
            },
          },
          animation: false,
        },
      ],
    });
    confirmBar = echarts.init(document.getElementById("confirmBar"));
    confirmBar.setOption({
      title: {
        text: "现有确诊前十国家",
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
          data: [],
          type: "category",
          axisLabel: {
            interval: 0,
            rotate: "",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      grid: {
        left: "20%",
      },
      series: [
        {
          type: "bar",
          barGap: "50%",
          data: [],
          barMinHeight: 2,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              color: function (params) {
                // build a color map as your need.
                var colorList = [
                  "rgba(139,26,26,1)",
                  "rgba(139,26,26,0.9)",
                  "rgba(139,26,26,0.8)",
                  "rgba(139,35,35,1)",
                  "rgba(139,35,35,0.9)",
                  "rgba(139,35,35,0.8)",
                  "rgba(205,38,38,1)",
                  "rgba(205,38,38,0.9)",
                  "rgba(205,38,38,0.8)",
                  "rgba(205,38,38,0.7)",
                ];
                return colorList[params.dataIndex];
              },
            },
          },
          animation: false,
        },
      ],
    });
    request({
      method: "get",
      url: "",
      params: {},
    }).then((data) => {
      this.wordData = data.data.data.areaTree;
      this.dateTime = data.data.data.lastUpdateTime;
      this.updateBar();
      this.updateNowConfirmMap();
      this.updateNewlyBar();
      this.updateConfrimBar();
      this.isHidden = !this.isHidden;
    });
    window.onresize = () => {
      this.updateView();
    };
  },
  computed: {
    nowConfirm() {
      let total = 0;
      for (let item of this.wordData) {
        total += item.total.confirm - item.total.dead - item.total.heal;
      }
      return total;
    },
    totalConfirm() {
      let total = 0;
      for (let item of this.wordData) {
        total += item.total.confirm;
      }
      return total;
    },
    todayConfirm() {
      let total = 0;
      for (let item of this.wordData) {
        total += item.today.confirm;
      }
      return total;
    },
    todayHeal() {
      let total = 0;
      for (let item of this.wordData) {
        total += item.today.heal;
      }
      return total;
    },
    totalDead() {
      let total = 0;
      for (let item of this.wordData) {
        total += item.total.dead;
      }
      return total;
    },
    totalHeal() {
      let total = 0;
      for (let item of this.wordData) {
        total += item.total.heal;
      }
      return total;
    },
  },
};
</script>
<style scoped>
.container-box {
  padding: 15px 15px;
  margin: 20px auto;
  width: 95%;
  background: #f0f0f0;
  border-radius: 30px;
  position: relative;
  box-shadow: 0 2px 20px rgb(0 0 0 / 10%);
}
.load {
  position: absolute;
  z-index: 2;
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
.view {
  display: flex;
}
.data-container {
  height: 270px;
}
.main,
.data-container {
  flex: 1;
}
#nowConfirm-map {
  margin-top: 20px;
}
#newlyBar,
#confirmBar {
  flex: 1;
  margin-top: 30px;
}
</style>