<template>
  <div class="relative text-lg md:w-48 w-full z-40">
    <button
      class="
        flex
        items-center
        justify-between
        px-3
        py-2
        bg-white
        w-full
        border border-gray-500
        rounded-lg
      "
      @click="isOptionsExpanded = !isOptionsExpanded"
      @blur="isOptionsExpanded = false"
    >
      <span>{{ selectedOption }}</span>
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
        :class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    <transition
      enter-active-class="transform transition duration-500 ease-custom"
      enter-class="-translate-y-1/2 scale-y-0 opacity-0"
      enter-to-class="translate-y-0 scale-y-100 opacity-100"
      leave-active-class="transform transition duration-300 ease-custom"
      leave-class="translate-y-0 scale-y-100 opacity-100"
      leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
    >
      <ul
        v-show="isOptionsExpanded"
        class="
          absolute
          left-0
          right-0
          mb-4
          bg-white
          divide-y
          rounded-lg
          shadow-lg
          overflow-scroll
          h-40
        "
      >
        <li
          v-for="(option, index) in options"
          :key="index"
          class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200"
          @mousedown.prevent="setOption(option.city)"
        >
          {{ option.city }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default {
  props: {},

  setup() {
    const store = useStore();
    const isOptionsExpanded = ref(false);
    const selectedOption = ref("All");
    const options = ref(null);
    const setOption = (option) => {
      selectedOption.value = option;
      isOptionsExpanded.value = false;
      store.commit("setCity", option);

      // store.setCity("option");
    };

    const getlist = () => {
      axios.get("https://fastapi-house.herokuapp.com/city").then((res) => {
        options.value = res.data;
      });
    };
    getlist();
    return { isOptionsExpanded, selectedOption, options, setOption, getlist };
  },
};
</script>

<style>
.ease-custom {
  transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}
</style>
