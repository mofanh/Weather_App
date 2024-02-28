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
        v-if="mapSearchResults"
      >
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again
        </p>
        <p class="py-2" v-if="!searchError && mapSearchResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapSearchResults"
            :key="searchResult.date"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const APIKey = "S5pdFsyVtm1NMYhdk";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapSearchResults = ref(null);
const searchError = ref(null);

const getSearchResult = () => {
  queryTimeout.value = setTimeout(async () => {
    clearTimeout(queryTimeout.value);
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.seniverse.com/v3/weather/daily.json?key=${APIKey}&location=${searchQuery.value}&language=zh-Hans&unit=c&start=-1&days=5`
        );
        mapSearchResults.value = result.data.results[0].daily;
        console.log(mapSearchResults.value[0]);
      } catch {
        searchError.value = true;
      }

      return;
    }
    mapSearchResults.value = null;
  }, 300);
};

const previewCity = (searchResult) => {
  console.log(searchResult);
};
</script>
