<template>
  <Banner />
  <div class="container-fluid">
    <Card2 Metrics="120 Policies" Description="Sale" Comparison="12%" />
    <Card2 Metrics="120 Policies" Description="Sale" Comparison="12%" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Banner from "../components/Banner.vue";
import Card from "../components/Cards.vue";
import Card2 from "../components/Card2.vue";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
    Banner,
    Card,
    Card2,
  },
});
</script>

<style>
html body {
  background-color: gray;
}
</style>