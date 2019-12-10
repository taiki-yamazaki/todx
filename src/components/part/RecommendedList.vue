<template>
  <div class="block">
    <ul class="recommend">
      <li v-for="item in recommended" :key="item.name">
        <i :class="[item.category, `material-icons`]">brightness_1</i>{{item.name}}<i class="info material-icons">info</i>
      </li>
    </ul>
    <div>
      <i class="material-icons">
        add_circle_outline
      </i>他の候補
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from "vue-property-decorator";

  export type Item = {
    name: string;
    category: string;
  }

  @Component
  export default class RecommendedList extends Vue {
    @Prop({default: () => []})
    private recommended?: Item[];
  }
</script>

<style scoped>
  .block {
    margin: 8px 8px 8px 64px;
    border: 1px solid #1b0000;
    border-radius: 8px;
    padding: 8px;
  }

  .recommend {
    list-style: none;
  }

  .recommend li {
    padding: 2px;
    font-size: 1.5rem;
  }

  .info {
    float: right;
    color: #2196f3;
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