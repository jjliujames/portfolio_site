<template>
  <div
    class="
      bg-white
      p-3
      rounded-xl
      shadow-xl
      flex
      items-center
      justify-between
      mt-4
      w-full
      mx-3
      md:w-80 md:m-1
    "
  >
    <div class="flex space-x-6 items-center">
      <i
        class="fas fa-money-bill-alt text-lg"
        :class="trends_direction ? 'text-green-300' : 'text-yellow-300'"
      ></i>
      <div>
        <p class="font-semibold text-base">{{ Metrics }}</p>
        <p class="font-semibold text-xs text-gray-400">{{ Description }}</p>
      </div>
    </div>

    <div class="flex space-x-2 items-center">
      <div
        class="rounded-md p-2 flex items-center"
        :class="trends_direction ? 'bg-green-200' : 'bg-yellow-200'"
      >
        <p class="text-white-600 font-semibold text-xs">{{ Comparison }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
export default {
  props: {
    Metrics: Number,
    Description: String,
    Comparison: Number,
  },
  setup(props) {
    var trends_direction = reactive(null);
    trends_direction = parseFloat(props.Comparison) / 100 >= 0;
    return { trends_direction };
  },
};
</script>
<style>
</style>