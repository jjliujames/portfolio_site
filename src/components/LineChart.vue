<template>
  <div :id="chartname"></div>
</template>
<script>
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { onMounted } from "vue";
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);
export default {
  props: ["chartdata", "chartname"],
  setup(props) {
    var option;
    // prettier-ignore
    const data = props.chartdata;
    console.log(data);
    const dateList = data.map(function (item) {
      return item[2];
    });
    const valueList = data.map(function (item) {
      return item[0];
    });
    const InventoryList = data.map(function (item) {
      return item[1];
    });
    option = {
      // Make gradient line here
      visualMap: [
        {
          show: false,
          type: "continuous",
          seriesIndex: 0,
          min: 0,
          max: 400,
        },
        {
          show: false,
          type: "continuous",
          seriesIndex: 1,
          dimension: 0,
          min: 0,
          max: dateList.length - 1,
        },
      ],
      title: [
        {
          left: "center",
          text: "Gradient along the y axis",
        },
        {
          top: "55%",
          left: "center",
          text: "Gradient along the x axis",
        },
      ],
      tooltip: {
        trigger: "axis",
      },
      xAxis: [
        {
          data: dateList,
        },
        {
          data: dateList,
          gridIndex: 1,
        },
      ],
      yAxis: [
        {},
        {
          gridIndex: 1,
        },
      ],
      grid: [
        {
          bottom: "60%",
        },
        {
          top: "60%",
        },
      ],
      series: [
        {
          type: "line",
          showSymbol: false,
          data: valueList,
        },
        {
          type: "line",
          showSymbol: false,
          data: InventoryList,
          xAxisIndex: 1,
          yAxisIndex: 1,
        },
      ],
    };
    onMounted(() => {
      var chartDom = document.getElementById(props.chartname);
      console.log(props.chartname);
      var myChart = echarts.init(chartDom, "dark");
      option && myChart.setOption(option);
    });
  },
};
</script>
<style>
</style>