<template>
  <Banner />
  <p class="text-white font-bold text-left ml-6">
    Updated as of {{ dt_string }}
  </p>

  <div class="flex flex-wrap justify-left">
    <Card2 Metrics="120 Policies" Description="Sale" Comparison="-12%" />
    <Card2 Metrics="120 Policies" Description="Sale" Comparison="12%" />
    <Card2 Metrics="120 Policies" Description="Sale" Comparison="12%" />
    <Card2 Metrics="120 Policies" Description="Sale" Comparison="12%" />
    <Card2 Metrics="120 Policies" Description="Sale" Comparison="-12%" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Banner from "../components/Banner.vue";
import Card from "../components/Cards.vue";
import Card2 from "../components/Card2.vue";
import { ref } from "vue";
import axios from "axios";
import City from "../components/test.vue";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
    Banner,
    Card,
    Card2,
    City,
  },
  setup() {
    const max_date = ref({});
    const dt_string = ref(null);
    let address = "http://127.0.0.1:8000/house_trends/recent_dt";
    const fetchdata = (url) => {
      return axios.get(url).then((res) => {
        max_date.value = res.data;
        console.log(typeof max_date);
        dt_string.value = max_date.value["recent_dt"].split("T")[0];
      });
    };
    fetchdata(address);
    return { fetchdata, max_date, dt_string };
  },
});
</script>

<style>
html body {
  background-color: gray;
}
</style>