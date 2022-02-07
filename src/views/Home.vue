<template>
  <Banner />
  <p class="text-white font-bold text-left ml-6">
    Updated as of {{ updated_dt }}
  </p>
  <div class="p-4 my-3 flex"><City /></div>
  <p>{{ selected_city }}</p>

  <div class="w-full">
    <div class="flex justify-center w-full mb-5 rounded-lg">
      <div
        class="
          grid
          h-10
          card
          bg-green-800
          rounded-box
          place-items-center
          text-white
          w-1/2
        "
      >
        Total Property Trends
      </div>
    </div>
    <div class="flex flex-wrap justify-center">
      <Card2
        :Metrics="String(Math.round(all_data['avg_price'] / 1000)).concat('K')"
        Description="Avg Listing Price"
        :Comparison="
          String(Math.floor(all_data['MoM_price'] * 100)).concat('%')
        "
        icon="fas fa-money-bill-alt"
      />
      <Card2
        :Metrics="all_data['listing_volume']"
        Description="Listing Volume"
        :Comparison="
          String(Math.floor(all_data['MoM_volume'] * 100)).concat('%')
        "
        icon="fas fa-calculator"
      />
    </div>
    <div>
      <LineChart
        chartname="all"
        :chartdata="all_data_chart['All']"
        :chartContainer="chart"
      />
    </div>
  </div>

  <div class="w-full mt-5">
    <div class="flex justify-center w-full mb-5">
      <div
        class="
          grid
          h-10
          card
          bg-green-800
          rounded-box
          place-items-center
          text-white
          w-1/2
        "
      >
        Total Housing Trends
      </div>
    </div>
    <div class="flex flex-wrap justify-center">
      <Card2
        :Metrics="
          String(Math.round(house_data['avg_price'] / 1000)).concat('K')
        "
        Description="Avg Listing Price"
        :Comparison="
          String(Math.floor(house_data['MoM_price'] * 100)).concat('%')
        "
        icon="fas fa-money-bill-alt"
      />
      <Card2
        :Metrics="house_data['listing_volume']"
        Description="Listing Volume"
        :Comparison="
          String(Math.floor(house_data['MoM_volume'] * 100)).concat('%')
        "
        icon="fas fa-calculator"
      />
    </div>
    <div>
      <LineChart
        chartname="House"
        :chartdata="all_data_chart['House']"
        :chartContainer="chart"
      />
    </div>
  </div>

  <div class="w-full mt-5">
    <div class="flex justify-center w-full mb-5">
      <div
        class="
          grid
          h-10
          card
          bg-green-800
          rounded-box
          place-items-center
          text-white
          w-1/2
        "
      >
        Total Condo Trends
      </div>
    </div>
    <div class="flex flex-wrap justify-center">
      <Card2
        :Metrics="
          String(Math.round(condo_data['avg_price'] / 1000)).concat('K')
        "
        Description="Avg Listing Price"
        :Comparison="
          String(Math.floor(condo_data['MoM_price'] * 100)).concat('%')
        "
        icon="fas fa-money-bill-alt"
      />
      <Card2
        :Metrics="condo_data['listing_volume']"
        Description="Listing Volume"
        :Comparison="
          String(Math.floor(condo_data['MoM_volume'] * 100)).concat('%')
        "
        icon="fas fa-calculator"
      />
    </div>
    <LineChart
      chartname="Condo"
      :chartdata="all_data_chart['Condo']"
      :chartContainer="chart"
    />
  </div>
  <div class="h-5"></div>
</template>

<script>
import { defineComponent } from "vue";
import Banner from "../components/Banner.vue";
import Card from "../components/Cards.vue";
import Card2 from "../components/Card2.vue";
import { ref, computed, watch } from "vue";
import axios from "axios";
import City from "../components/Selection_list.vue";
import { useStore } from "vuex";
import LineChart from "../components/LineChart.vue";

export default defineComponent({
  name: "Home",
  components: {
    Banner,
    Card,
    Card2,
    City,
    LineChart,
  },
  setup() {
    const store = useStore();
    const city = computed(() => store.state.selected_city);
    const chart = ref([]);
    const updated_dt = ref(null);
    const all_data = ref({});
    const condo_data = ref({});
    const house_data = ref({});
    const all_data_chart = ref({});
    var address = computed(() => {
      return "https://fastapi-house.herokuapp.com/?city=" + city.value;
    });
    const returnvalue = (x, type) => {
      var array = [];
      x.forEach((each) => {
        if (each["type"] === type) {
          array.push([
            each["avg_price"],
            each["listing_volume"],
            each["timestamp"],
          ]);
        }
      });
      return array;
    };
    const fetchdata = (url) => {
      return axios.get(url).then((res) => {
        chart.value = [];
        updated_dt.value = res.data["update_dt"];
        console.log(res.data);
        all_data.value = res.data["today"]["All"];
        condo_data.value = res.data["today"]["Condo"];
        house_data.value = res.data["today"]["House"];
        all_data_chart.value["All"] = returnvalue(res.data["all"], "All");
        all_data_chart.value["House"] = returnvalue(res.data["all"], "House");
        all_data_chart.value["Condo"] = returnvalue(res.data["all"], "Condo");
      });
    };
    watch(
      () => store.state.selected_city,
      () => {
        console.log(city.value);
        console.log(address.value);
        fetchdata(address.value);
      }
    );
    fetchdata(address.value);

    const resizechart = () => {
      chart.value.forEach((element) => {
        element.resize();
      });
    };

    window.onresize = resizechart;

    return {
      fetchdata,
      updated_dt,
      city,
      all_data,
      condo_data,
      house_data,
      address,
      all_data_chart,
      chart,
    };
  },
});
</script>

<style>
html body {
  background-color: gray;
  height: 100vh;
}
</style>