<template>
  <div class="block">
    経由地<br/>
    <h1><i :class="[spot.category, `material-icons`]">brightness_1</i>{{spot.name}}</h1>
    <h2 class="time">滞在時間：{{stayTime}}</h2>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";
  import {Spot} from "@/ToDxService";

  @Component
  export default class Waypoint extends Vue {
    @Prop()
    private spot?: Spot;

    public get stayTime(): string {
      if (!this.spot) return "00:30";
      if (!this.spot.recommendedStayMinutes) return "00:30";
      const hours = Math.floor(this.spot.recommendedStayMinutes / (60));
      const minutes = Math.floor(hours * 60 - this.spot.recommendedStayMinutes);
      return `${this.zeroPadding(hours)}:${this.zeroPadding(minutes)}`;
    }

    public zeroPadding(num: Number): string {
      return `0${num}`.slice(-2);
    }
  }
</script>

<style scoped>
  .block {
    margin: 8px 8px 8px 64px;
    border: 1px solid #1b0000;
    border-radius: 8px;
    padding: 8px;
    background-color: #fafafa;
  }

  .description {
    overflow: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .footer {
    border-top: 1px solid #cfcfcf;
    padding-top: 8px;
    margin-top: 8px;
    height: 55px;
  }

  .time {
    font-weight: unset;
    display: inline;
  }

  .food {
    color: #2196f3;
  }

  .red {
    color: #f44336;
  }

  .green {
    color: #4caf50;
  }

  .orange {
    color: #ff5722;
  }

  .thumbnail {
    border: none;
    width: 100%;
    height: 500px;
  }

  a.button {
    display: inline-block;
    padding: 0.35em 1.2em;
    border: 0.1em solid #000000;
    margin: 0 0.3em 0.3em 0;
    border-radius: 0.12em;
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    color: #000000;
    text-align: center;
    transition: all 0.2s;
    float: right;
  }

  a.button:hover {
    color: #ffffff;
    background-color: #000000;
  }

  .big {
    font-size: 1.3rem;
  }
</style>