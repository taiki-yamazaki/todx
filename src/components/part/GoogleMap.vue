<template>
  <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="12"
      map-type-id="terrain"
      style="width: 100vw; height: 100vh"
  >
    <gmap-polyline v-bind:path.sync="paths" v-bind:options="{ strokeColor:'#008000'}"></gmap-polyline>

    <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :title="m.title"
        :icon="m.icon"
        :label="m.label"
        @click="center=m.position"
    />

  </GmapMap>
</template>

<script>
  import {gmapApi} from 'vue2-google-maps';

  export default {
    name: "GoogleMap",

    props: ['from', 'to', 'spots', 'routes'],

    computed: {
      google: gmapApi,
      center: function () {
        const markers = this.markers;
        if (markers.length === 0) return {lat: 0, lng: 0};

        const sum = markers.reduce((acc, m) => {
          return {
            lat: acc.lat + m.position.lat,
            lng: acc.lng + m.position.lng
          }
        }, {lat: 0, lng: 0});
        return {
          lat: sum.lat / markers.length,
          lng: sum.lng / markers.length
        };
      },
      markers: function () {
        if (!this.google) return [];
        const markers = [];
        if (this.from) {
          markers.push({
            position: this.from.position,
            animation: this.google.maps.Animation.DROP,
            title: this.from.name
          });
        }

        if (this.to) {
          markers.push({
            position: this.to.position,
            animation: this.google.maps.Animation.DROP,
            title: this.to.name
          })
        }

        if (this.spots) {
          this.spots.forEach(s => {
            markers.push({
              position: s.position,
              animation: this.google.maps.Animation.DROP,
              title: s.title,
              icon: "http://maps.google.com/mapfiles/ms/micons/green-dot.png"
            })
          })
        }
        return markers;
      }
    },

    data() {
      return {
        paths: [{lat: 26.2100063, lng: 127.675507}, {lat: 27.2100063, lng: 127.675507}, {
          lat: 26.2100063,
          lng: 125.675507
        }]
      };
    },

    methods: {
      testFunc: function () {
        // var encodeString = this.google.maps.geometry.encoding.decodePath("ampsCg~wtVG?C]C]Ca@C_@c@BKyAM{Ae@F");
        // console.log(this.google);
        // console.log(encodeString);
      },
    },
  };

</script>

<style scoped>

</style>
