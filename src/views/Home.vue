<template>
  <Banner />
  <p class="text-white font-bold text-left ml-6">
    Updated as of {{ updated_dt }}
  </p>
  <div class="p-4 my-3 flex"><City /></div>
  <p>{{ selected_city }}</p>
  <div class="w-full">
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
  </div>
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

export default defineComponent({
  name: "Home",
  components: {
    Banner,
    Card,
    Card2,
    City,
  },
  setup() {
    const store = useStore();
    const city = computed(() => store.state.selected_city);

    const updated_dt = ref(null);
    const all_data = ref({});
    const condo_data = ref({});
    const house_data = ref({});
    var address = computed(() => {
      return "https://fastapi-house.herokuapp.com/?city=" + city.value;
    });

    const fetchdata = (url) => {
      return axios.get(url).then((res) => {
        updated_dt.value = res.data["update_dt"];
        console.log(res.data);
        all_data.value = res.data["today"]["All"];
        condo_data.value = res.data["today"]["Condo"];
        house_data.value = res.data["today"]["House"];
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
    return {
      fetchdata,
      updated_dt,
      city,
      all_data,
      condo_data,
      house_data,
      address,
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