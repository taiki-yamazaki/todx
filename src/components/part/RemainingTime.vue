<template>
  <div class="block">
    <div class="caption">空き時間</div>
    <div class="time">{{timeString}}</div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";

  @Component
  export default class OriginPlace extends Vue {
    @Prop()
    private arrivalTime?: Date;

    private timer?: number = undefined;
    private timeString: string = "";

    public mounted(): this {
      this.timer = setInterval(
        () => {this.timeString = this.remainingTimeString(new Date(), this.arrivalTime)},
        1000);
      return this;
    }

    public beforeDestroy(): void {
      clearInterval(this.timer);
    }

    public remainingTimeString(departure: Date, arrival?: Date): string {
      if (!arrival) return "--:--";
      const diff = arrival.getTime() - departure.getTime();
      const diffHours = Math.floor(diff / (1000 * 60 * 60));
      const diffMinutes = Math.floor(diff / (1000 * 60));
      return `${this.zeroPadding(diffHours)}:${this.zeroPadding(diffMinutes)}`;
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
    padding: 8px;
    background-color: #3e2723;
    color: #fafafa;
    height: 4rem;
  }

  .caption {
    color: #fafafa;
    font-weight: unset;
    display: inline;
  }

  .time {
    color: #fafafa;
    font-weight: bold;
    font-size: 2rem;
    float: right;
  }
</style>