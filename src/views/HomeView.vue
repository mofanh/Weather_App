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
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <!-- 异步页面需要Suspense提供给主页面等待效果 -->
        <CityList />
        <template #fallback><CityCardSkeleton /> </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "@/components/CityList.vue";
import CityCardSkeleton from "@/components/CityCardSkeleton.vue";

// const APIKey = "S5pdFsyVtm1NMYhdk";
const mapboxAPIKey =
  "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapSearchResults = ref(null);
const searchError = ref(null);

const getSearchResult = () => {
  queryTimeout.value = setTimeout(async () => {
    clearTimeout(queryTimeout.value);
    if (searchQuery.value !== "") {
      try {
        // const result = await axios.get(
        //   `https://api.seniverse.com/v3/weather/daily.json?key=${APIKey}&location=${searchQuery.value}&language=zh-Hans&unit=c&start=-1&days=5`
        //   // `http://api.openweathermap.org/data/2.5/forecast?q=beijing&appid=${APIKey}`
        // );
        // mapSearchResults.value = result.data.results[0].daily;
        // console.log(mapSearchResults.value[0]);

        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapSearchResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }

      return;
    }
    mapSearchResults.value = null;
  }, 300);
};

const router = useRouter();
const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(","); // 时间、经纬度
  router.push({
    name: "cityView",
    params: { state: state.replaceAll(" ", ""), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};
</script>
