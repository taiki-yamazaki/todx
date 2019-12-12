<template>
  <div id="app">
    <section class="map">
      <GoogleMap :from="origin" :to="dest" :spots="spots" :routes="routes" @selected="handleSpotSelect"/>
    </section>
    <section class="left-panel">
      <div class="dot"></div>
      <Origin v-if="origin" :address="origin.name"/>
      <Waypoint v-for="spot in waypoints" :key="'w_' + spot.name" :spot="spot" @remove="handleRemoveWaypoint"/>
      <RemainingTime v-if="arrivalTime" :arrival-time="arrivalTime"/>
      <SpotDetail v-if="selected" :spot="selected" @register="handleRegister" @close="handleSpotUnselect"/>
      <Destination :address="dest.name" :arrival-time="arrivalTime"/>
    </section>
    <section class="credit">
      Supported by <a href="https://api.gnavi.co.jp/api/scope/" target="_blank">ぐるなびWebService</a>
      <a href="https://www.ottop.databed.org/" target="_blank">
        <img src="https://static.wixstatic.com/media/f3fc6c_cb12feefd69a4732af8f00f2e572deb7~mv2.png/v1/fill/w_318,h_135,al_c,q_80,usm_0.66_1.00_0.01/OTTOP-Logo-blue.webp" alt="ottop">
      </a>
    </section>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import Origin from './components/part/OriginPlace.vue';
  import Destination from './components/part/DestinationPlace.vue';
  import RemainingTime from './components/part/RemainingTime.vue';
  import RecommendedList from './components/part/RecommendedList.vue';
  import SpotDetail from './components/part/SpotDetail.vue';
  import Timelimit from './components/part/Timelimit.vue';
  import GoogleMap from "@/components/part/GoogleMap.vue";
  import Waypoint from "@/components/part/Waypoint.vue";
  import {fetchRoutes, fetchSpots2, Route, Spot} from "@/ToDxService";

  export type P = {
    lat: number,
    lng: number,
  };

  @Component({
    components: {
      Waypoint,
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
    private origin: Spot = {name: "empty", position: {lat: 0, lng: 0}};

    private dest = {
      name: "南城市役所",
      position: {lat: 26.1642434, lng: 127.7698106},
    };
    private arrivalTime = this.plus6Hour(new Date());

    private spots: Array<Spot> = [];
    private waypoints: Array<Spot> = [];
    private routes: Array<Route> = [];

    private selected: Spot | null = null;

    public mounted(): void {
      this.origin = {
        name: "南城市役所",
        position: {lat: 26.1642434, lng: 127.7698106},
      };
    }

    public handleSpotSelect(spot: Spot): void {
      this.selected = spot;
    }

    public handleSpotUnselect(): void {
      this.selected = null;
    }

    public handleRegister(spot: Spot): void {
      this.selected = null;
      this.waypoints.push(spot);
    }

    public handleRemoveWaypoint(spot: Spot): void {
      this.selected = null;
      this.waypoints = this.waypoints.filter(w => w !== spot);
    }

    public fetchRecommendedSpots(p: P): void {
      fetchSpots2(p)
        .then(spots => this.spots = spots);
    }

    @Watch('origin')
    originChanged(next: any, prev: any) {
      this.fetchRecommendedSpots(next.position);
    }

    @Watch('waypoints')
    waypointsChanged(next: any, prev: any) {
      if (next.length === 0) {
        this.fetchRecommendedSpots(this.origin.position);
      } else {
        this.fetchRecommendedSpots(next.slice(-1)[0].position);
      }
    }

    @Watch('origin')
    fetchRoute(next: any, prev: any) {
      fetchRoutes(next.position, this.dest.position, this.arrivalTime)
        .then(routes => this.routes = routes);
    }

    @Watch('waypoints')
    fetchRoutes(next: any, prev: any) {
      const arr = [this.origin];
      arr.push(...this.waypoints);
      arr.push(this.dest);

      const pairs = [];
      for (let i = 0; i < arr.length - 1; i++) {
        pairs.push([arr[i], arr[i + 1]]);
      }
      console.log(pairs);
      Promise.all(
        pairs.map(p => fetchRoutes(p[0].position, p[1].position, new Date(1576119600000)))
      )
        .then(results => {
          console.log(results);
          return results.flatMap(r => r);
        })
        .then((routes: any) => {
          this.routes = routes
        });
    }

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

  .dot {
    position: absolute;
    left: 30px;
    border-left: 10px dashed #4caf50;
    height: 100%;
    z-index: -1;
    overflow: hidden;
  }

  .left-panel {
    position: absolute;
    top: 0;
    left: 0;
    max-width: 500px;
    user-select: none;
  }

  .credit {
    user-select: none;
    pointer-events: none;
    position: fixed;
    right: 70px;
    bottom: 0;
  }
</style>
