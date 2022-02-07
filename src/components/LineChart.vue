<template>
  <div
    :id="chartname"
    style="width: 100%; height: 600px"
    class="mt-5 mx-auto sm:px-5"
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
  props: ["chartdata", "chartname", "chartContainer"],
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
          backgroundColor: "white",
          visualMap: [
            {
              show: false,
              type: "continuous",
              seriesIndex: 0,
              min: 500000,
              max: 1000000,
            },
            {
              show: false,
              type: "continuous",
              seriesIndex: 1,
              min: 3000,
              max: 8000,
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
            {
              axisLine: { onZero: false },
              nameTextStyle: {
                fontSize: 9,
              },
            },
            {
              gridIndex: 1,
              axisLine: { onZero: false },
              nameTextStyle: {
                fontSize: 9,
              },
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
              areaStyle: {},
            },
            {
              type: "line",
              showSymbol: false,
              data: InventoryList,
              xAxisIndex: 1,
              yAxisIndex: 1,
              areaStyle: {},
            },
          ],
        };
        var chartDom = document.getElementById(props.chartname);
        console.log(props.chartname);
        var myChart = echarts.init(chartDom);
        option && myChart.setOption(option);
        props.chartContainer.push(myChart);
      }
    );
  },
};
</script>
<style>
</style>