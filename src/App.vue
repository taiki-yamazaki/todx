<template>
  <div id="app">
    <h1>パーツリスト</h1>
    <img alt="logo" src="./assets/logo.png">
    <Origin :address="originAddress"/>
    <Destination :address="destAddress" :arrival-time="arrivalTime"/>
    <RemainingTime :arrival-time="arrivalTime"/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Origin from './components/part/OriginPlace.vue';
  import Destination from './components/part/DestinationPlace.vue';
  import RemainingTime from './components/part/RemainingTime.vue';

  @Component({
    components: {
      Origin,
      Destination,
      RemainingTime
    },
  })
  export default class App extends Vue {
    private originAddress = "現在位置の住所";

    private destAddress = "目的地の住所";
    private arrivalTime = this.plus6Hour(new Date());

    private plus6Hour(time: Date): Date {
      const next = new Date(time.getTime());
      next.setHours(next.getHours() + 6);
      return next;
    }

  }
</script>

<style>
</style>
