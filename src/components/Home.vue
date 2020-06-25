<template>
  <div>
    <div class="home-title">Personal Boards</div>
    <div class="board-list">
      <div class="board-item" v-for="b in boards" :key="b.id" :data-bgcolor="b.bgColor" ref="boardItem">
        <router-link :to="`/b/${b.id}`">
          <div class="board-item-title">{{b.title}}</div>
        </router-link>
      </div>
      <div class="board-item">
        <a class="new-board-btn" href="" @click.prevent="showAddBoard">
          Create new board...
        </a>
      </div>
    </div>
    <AddBoard v-if="isAddBoard" @close="closeAddBoard" @submit="onAddBoard"/>
  </div>
</template>

<script>
  import { Board } from '../api';
  import Modal from './Modal';
  import AddBoard from './AddBoard';

  export default {
    name: "Home.vue",
    components: {Modal, AddBoard},
    data() {
      return {
        loading: false,
        boards: [],
        error: '',
        isAddBoard: false,
      };
    },
    created() {
      this.fetchData();
    },
    updated() {
      this.$refs.boardItem.forEach(el => {
        el.style.backgroundColor = el.dataset.bgcolor;
      })
    },
    methods: {
      fetchData() {
        this.loading = true;
        Board.fetch()
        .then(data => {
          this.boards = data.list;
        })
        .finally(() => {
          this.loading = false;
        })
      },
      showAddBoard() {
        this.isAddBoard = true;
      },
      closeAddBoard() {
        this.isAddBoard = false;
      },
      onAddBoard(title) {
        Board.create(title)
        .then(() => this.fetchData())
      }
    }
  }
</script>

<style>
  .home-title {
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
  }
  .board-list {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
  }
  .board-item {
    width: 23%;
    height: 100px;
    margin: 0 2% 20px 0;
    border-radius: 3px;
  }
  .board-item a {
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
  }
  .board-item a:hover,
  .board-item a:focus {
    background-color: rgba(0,0,0, .1);
    color: #666;
  }
  .board-item-title {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    padding: 10px;
  }
  .board-item a.new-board-btn {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    height: 100px;
    width: inherit;
    color: #888;
    font-weight: 700;
  }
</style>
