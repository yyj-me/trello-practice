<template>
  <div>
    Home
    <div>
      Board List:
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-for="b in boards" :key="b.id">{{b}}</div>
      </div>
      <ul>
        <li>
          <router-link to="/b/1">Board 1</router-link>
        </li>
        <li>
          <router-link to="/b/2">Board 2</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { Board } from '../api';

  export default {
    name: "Home.vue",
    data() {
      return {
        loading: false,
        boards: [],
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.loading = true;
        Board.fetch()
        .then(res => {
          this.boards = res.data;
        })
        .finally(() => {
          this.loading = false;
        })
      }
    }
  }
</script>

<style scoped>

</style>
