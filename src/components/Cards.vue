<template>
  <!-- Start Card List -->
  <div
    class="
      relative
      w-80
      h-20
      bg-cover bg-center
      group
      rounded-lg
      overflow-hidden
      mt-4
      shadow-lg
      transition
      duration-300
      ease-in-out
    "
    style="
      background-image: url('https://www.tokkoro.com/picsup/5081898-forest-nature-road.jpg');
    "
  >
    <div
      class="
        absolute
        inset-0
        bg-black bg-opacity-50
        transition
        duration-300
        ease-in-out
      "
    ></div>
    <div class="relative w-full h-full px-2 sm:px-6 lg:px-2 flex items-center">
      <div class="flex">
        <div class="text-white text-lg flex space-x-2 items-center">
          <div class="bg-white rounded-md p-2 flex items-center">
            <i class="fas fa-toggle-off fa-sm text-yellow-300"></i>
          </div>
          <p>Finished Appt</p>
        </div>
        <h3 class="text-white text-2xl mt-2 font-bold text-left">120</h3>
        <h3 class="text-white text-lg mt-2 text-yellow-100 text-left">
          4 not confirmed
        </h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
</style>