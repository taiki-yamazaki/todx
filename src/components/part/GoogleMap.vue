<template>
  <GmapMap
      :center="{lat:26.2100063, lng:127.675507}"
      :zoom="15"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
  >
  </GmapMap>
</template>
<script>
  export default {
    name: "GoogleMap",
  }
</script>

<style scoped>

</style>