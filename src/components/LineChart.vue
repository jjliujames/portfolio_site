<template>
  <div
    :id="chartname"
    style="width: 650px; height: 600px"
    class="mt-5 mx-auto"
  ></div>
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
import { computed, watch } from "vue";

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
    console.log('load chart',props.chartdata)
    const data = props.chartdata;
    console.log("chartdata", data);
    watch(
      () => props.chartdata,
      () => {
        const data = props.chartdata;
        console.log("chartdata", data);
        const dateList = data.map(function (item) {
          return item[2];
        });
        const valueList = data.map(function (item) {
          return item[0];
        });

        const InventoryList = data.map(function (item) {
          return item[1];
        });
        console.log(dateList);

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
              text: "Housing Price Trends",
            },
            {
              top: "55%",
              left: "center",
              text: "Listing Volume Trends",
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
        var chartDom = document.getElementById(props.chartname);
        console.log(props.chartname);
        var myChart = echarts.init(chartDom, "dark");
        option && myChart.setOption(option);
      }
    );
  },
};
</script>
<style>
</style>