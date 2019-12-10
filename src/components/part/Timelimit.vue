<template>
  <div class="timelimit">
    <h2>⽬的地への出発まで残り時間合計</h2>
    <h1>{{timeString}}</h1>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";

  @Component
  export default class Timelimit extends Vue {
    @Prop()
    private limit?: Date;

    private timer?: number = undefined;
    private timeString: string = "";

    public mounted(): this {
      this.timer = setInterval(
        () => {this.timeString = this.timeToString(this.limit)},
        1000);
      return this;
    }

    public beforeDestroy(): void {
      clearInterval(this.timer);
    }

    public timeToString(time?: Date): string {
      if (!time) return "--:--:--";
      const now = new Date();
      const diff = time.getTime() - now.getTime();
      let diffHours = diff / (1000 * 60 * 60);
      let diffMinutes = (diffHours - Math.floor(diffHours)) * 60;
      let diffSeconds = (diffMinutes - Math.floor(diffMinutes)) * 60;
      return `${this.zeroPadding(diffHours)}:${this.zeroPadding(diffMinutes)}:${this.zeroPadding(diffSeconds)}`;
    }

    public zeroPadding(num: number): string {
      return `0${Math.floor(num)}`.slice(-2);
    }
  }
</script>

<style scoped>
  .timelimit {
    width: 100%;
    text-align: center;
    background: #ffee58;
    padding: 8px;
    margin: 8px 0;
  }
</style>