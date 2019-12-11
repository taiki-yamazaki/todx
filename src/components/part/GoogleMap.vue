<template>
  <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="12"
      map-type-id="terrain"
      style="width: 100vw; height: 100vh"
  >
    <GmapMarker
        :key="'m_' + index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        :title="m.title"
        :icon="m.icon"
        :label="m.label"
        @click="select(m)"
    />

    <GmapPolyline
        v-for="(r, index) in routes"
        :key="'r_' + index"
        :path="decodePolyline(r.polyline)"
        :options="{ strokeColor: strokeColor(r.mode)}"
    />
  </GmapMap>
</template>

<script>
  import {gmapApi} from 'vue2-google-maps';

  export const COLORS = {
    WALK: "#ff9800",
    FERRY: "#3f51b5"
  };

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
            title: this.from.name,
            spot: this.from
          });
        }

        if (this.to) {
          markers.push({
            position: this.to.position,
            animation: this.google.maps.Animation.DROP,
            title: this.to.name,
            spot: this.to
          })
        }

        if (this.spots) {
          this.spots.forEach(s => {
            markers.push({
              position: s.position,
              animation: this.google.maps.Animation.DROP,
              title: s.name,
              icon: "http://maps.google.com/mapfiles/ms/micons/green-dot.png",
              spot: s
            })
          })
        }
        return markers;
      }
    },

    data() {
      return {};
    },

    methods: {
      decodePolyline: function (encoded) {
        return this.google.maps.geometry.encoding.decodePath(encoded);
      },
      strokeColor: function (mode) {
        const color = COLORS[mode];
        return color || "#4caf50";
      },
      select: function (marker) {
        this.$emit("selected", marker.spot);
      }
    },
  };

</script>

<style scoped>

</style>
