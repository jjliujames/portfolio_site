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
      w-60
      md:w-80
    "
  >
    <div class="flex space-x-6 items-center">
      <i class="fas fa-money-bill-alt text-lg text-yellow-300"></i>
      <div>
        <p class="font-semibold text-base">{{ Metrics }}</p>
        <p class="font-semibold text-xs text-gray-400">{{ Description }}</p>
      </div>
    </div>

    <div class="flex space-x-2 items-center">
      <div class="bg-yellow-200 rounded-md p-2 flex items-center">
        <p class="text-white-600 font-semibold text-xs">{{ Comparison }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    Metrics: Number,
    Description: String,
    Comparison: Number,
    Tag: String,
  },
};
</script>
<style>
</style>