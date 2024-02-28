<template>
  <main class="container text-white">
    <div class="pt-4 mt-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResult"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
      <li v-for=""></li>
    </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const mapAPIKey = "4fcaad0af910cdc0b9cc03c6f8908a30";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapSearchResult = ref(null);

const getSearchResult = () => {
  queryTimeout.value = setTimeout(async () => {
    clearTimeout(queryTimeout.value);
    if (searchQuery.value !== "") {
      const result = await axios.get(
        `https://restapi.amap.com/v3/weather/weatherInfo?key=${mapAPIKey}&city=${searchQuery.value}`
        // `https://restapi.amap.com/v3/weather/weatherInfo?key=${mapAPIKey}8&city=110000&extensions=all`
      );
      mapSearchResult.value = result.data;
      console.log(result);
      return;
    }
    mapSearchResult.value = null;
  }, 300);
};
</script>
