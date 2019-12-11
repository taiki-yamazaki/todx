<template>
  <div id="app">
    <h1>パーツリスト</h1>
    <img alt="logo" src="./assets/logo.png">
    <Origin :address="originAddress"/>
    <Destination :address="destAddress" :arrival-time="arrivalTime"/>
    <RemainingTime :arrival-time="arrivalTime"/>
    <RecommendedList :recommended="recommended"/>
    <SpotDetail :spot="spot"/>
    <Timelimit :limit="arrivalTime"/>
    <GoogleMap/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Origin from './components/part/OriginPlace.vue';
  import Destination from './components/part/DestinationPlace.vue';
  import RemainingTime from './components/part/RemainingTime.vue';
  import RecommendedList from './components/part/RecommendedList.vue';
  import SpotDetail from './components/part/SpotDetail.vue';
  import Timelimit from './components/part/Timelimit.vue';
  import GoogleMap from "@/components/part/GoogleMap.vue";

  @Component({
    components: {
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
    private originAddress = "現在位置の住所";

    private destAddress = "目的地の住所";
    private arrivalTime = this.plus6Hour(new Date());

    private recommended = [
      {name: "観光地A", category: "food"},
      {name: "観光地B", category: "red"},
      {name: "観光地C", category: "green"},
      {name: "観光地D", category: "orange"},
    ];

    private spot = {
      name: "勝連城",
      category: "green",
      recommendedStayMinutes: 30,
      position: {lat: 26.330397, lng: 127.8790449},
      description: "15世紀、海外貿易により勝連に繁栄をもたらした阿麻和利が居城したとして有名な勝連城。\n" +
        "\n" +
        "2000年にユネスコの世界遺産に登録されました。\n" +
        "\n" +
        "自然の断崖を利用した難攻不落の城と言われる勝連城ですが、その城壁は優雅な曲線を描き、女性的な美しさを感じさせます。頂上に登ると太平洋に輝く青い海が一望できる沖縄有数の景勝地です。"
    };

    private plus6Hour(time: Date): Date {
      const next = new Date(time.getTime());
      next.setHours(next.getHours() + 6);
      return next;
    }

  }
</script>

<style>
</style>
