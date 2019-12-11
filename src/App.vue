<template>
  <div id="app">
    <section class="map">
      <GoogleMap :from="origin" :to="dest" :spots="spots"/>
    </section>
    <section class="left-panel">
      <Origin :address="origin.name"/>
      <RemainingTime v-if="arrivalTime" :arrival-time="arrivalTime"/>
      <i class="add material-icons" onclick="console.log('click')">add_circle</i>
      <Destination :address="dest.name" :arrival-time="arrivalTime"/>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Origin from './components/part/OriginPlace.vue';
  import Destination from './components/part/DestinationPlace.vue';
  import RemainingTime from './components/part/RemainingTime.vue';
  import RecommendedList from './components/part/RecommendedList.vue';
  import SpotDetail from './components/part/SpotDetail.vue';
  import Timelimit from './components/part/Timelimit.vue';
  import GoogleMap from "@/components/part/GoogleMap.vue";

  export type P = {
    lat: number,
    lng: number,
  };

  @Component({
    components: {
      GoogleMap,
      Origin,
      Destination,
      RemainingTime,
      RecommendedList,
      SpotDetail,
      Timelimit
    },
  })
  export default class App extends Vue {
    private origin = {
      name: "フェリーよなくに乗り場",
      position: {lat: 24.334922, lng: 124.157306},
    };

    private dest = {
      name:  "上原港 Uehara Port",
      position: {lat: 24.418302, lng: 123.799868},
    };
    private arrivalTime = this.plus6Hour(new Date());

    private spots = [
      {
        name:  "spot A",
        position: {lat: 24.428112, lng: 123.799968},
      },
      {
        name:  "spot B",
        position: {lat: 24.418412, lng: 123.899878},
      },
      {
        name:  "spot C",
        position: {lat: 24.418302, lng: 123.809868},
      },
      {
        name:  "spot D",
        position: {lat: 24.354922, lng: 124.157306},
      }
    ];

    private plus6Hour(time: Date): Date {
      const next = new Date(time.getTime());
      next.setHours(next.getHours() + 6);
      return next;
    }
  }
</script>

<style scoped>
  .map {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
  }

  .left-panel {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 500px;
    user-select: none;
  }

  .add {
    display: block;
    text-align: center;
    font-size: 4rem;
  }
</style>
