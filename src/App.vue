<template>
  <div id="app">
    <h1>パーツリスト</h1>
    <img alt="logo" src="./assets/logo.png">
    <Origin :address="originAddress"/>
    <Destination :address="destAddress" :arrival-time="arrivalTime"/>
    <RemainingTime :arrival-time="arrivalTime"/>
    <RecommendedList :recommended="recommended"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Origin from './components/part/OriginPlace.vue';
  import Destination from './components/part/DestinationPlace.vue';
  import RemainingTime from './components/part/RemainingTime.vue';
  import RecommendedList from './components/part/RecommendedList.vue';

  @Component({
    components: {
      Origin,
      Destination,
      RemainingTime,
      RecommendedList
    },
  })
  export default class App extends Vue {
    private originAddress = "現在位置の住所";

    private destAddress = "目的地の住所";
    private arrivalTime = this.plus6Hour(new Date());

    private recommended = [
      {name: "観光地A", category: "food"},
      {name: "観光地B", category: "red"},
      {name: "観光地C", category: "green"},
      {name: "観光地D", category: "orange"},
    ];

    private plus6Hour(time: Date): Date {
      const next = new Date(time.getTime());
      next.setHours(next.getHours() + 6);
      return next;
    }

  }
</script>

<style>
</style>
