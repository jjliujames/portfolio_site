
<template>
  <p>test</p>
</template>

<script>
export default {
  setup() {
    const listcity = ref(null);
    const getcity = () => {
      return axios
        .get("http://127.0.0.1:8000/house_trends/city_names")
        .then((res) => {
          console.log(res.data);
          listcity.value = res.data;
        });
    };
    getcity();
    return { listcity };
  },
};
</script>
