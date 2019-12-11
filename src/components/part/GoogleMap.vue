<template>
  <GmapMap
      ref = "mapRef"
      :center="{lat:26.2100063, lng:127.675507}"
      :zoom="15"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
  >
  <gmap-polyline v-bind:path.sync="paths" v-bind:options="{ strokeColor:'#008000'}"></gmap-polyline>

  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    :title = "m.title"
    @click="center=m.position"
  ></GmapMarker>

  </GmapMap>
</template>

<script>
import {gmapApi} from 'vue2-google-maps'
var path = [];
export default {
    name: "GoogleMap",

    computed: {
        google: gmapApi
      },

    mounted () {
    this.$refs.mapRef.$mapPromise.then((map) => {
      this.map = map;
      this.testFunc();
    })
  },

    data() {
      return {
        markers:[{position:{lat: 26.2100063, lng: 127.675507},title: "test"}],
        paths:[{lat: 26.2100063, lng: 127.675507},{lat: 27.2100063, lng: 127.675507},{lat: 26.2100063, lng: 125.675507}]
        //paths:path,
      };
    },

    methods: {
      testFunc:function(){
        var encodeString = this.google.maps.geometry.encoding.decodePath("ampsCg~wtVG?C]C]Ca@C_@c@BKyAM{Ae@F");
        console.log(this.google);
        console.log(encodeString);
      },
    },
    };

</script>

<style scoped>

</style>
