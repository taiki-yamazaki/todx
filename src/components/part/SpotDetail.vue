<template>
  <div class="block">
    <h1><i :class="[spot.category, `material-icons`]">brightness_1</i>{{spot.name}}</h1>
    <pre class="description">{{spot.description}}</pre>
    <div class="footer">
      <h2 class="time">滞在目安：{{stayTime}}</h2>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";

  export type Item = {
    name: string;
    category: string;
    description: string;
    recommendedStayMinutes: number;
  }

  @Component
  export default class SpotDetail extends Vue {
    @Prop()
    private spot?: Item;

    public get stayTime(): string {
      console.log("");
      if (!this.spot) return "00:30";
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
</style>