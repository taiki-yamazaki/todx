<template>
  <div class="block">
    <h1 class="caption">目的地</h1>
    <h2 class="time">到着予定: {{ timeString }}</h2>
    <input class="address" readonly :value="address">
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";

  @Component
  export default class OriginPlace extends Vue {
    @Prop()
    private arrivalTime?: Date;

    @Prop()
    private address?: string;

    private timeString: string = this.timeToString(this.arrivalTime);

    public timeToString(time?: Date): string {
      if (!time) return "";
      return `${this.zeroPadding(time.getHours())}:${this.zeroPadding(time.getSeconds())}`;
    }

    public zeroPadding(num: Number): string {
      return `0${num}`.slice(-2);
    }
  }
</script>

<style scoped>
  .block {
    border: 3px solid #03a9f4;
    border-radius: 1rem;
    padding: 8px;
    background-color: #67daff;
  }

  .caption {
    color: #fafafa;
    font-weight: unset;
    display: inline;
  }

  .time {
    font-weight: unset;
    display: inline;
  }

  .address {
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    border: 2px solid #82b3c9;
    pointer-events: none;
    background-color: #b3e5fc;
    font-size: 1.25rem;
  }
</style>