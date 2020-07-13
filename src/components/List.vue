<template>
  <div class="list" :data-list-pos="data.pos" :data-list-id="data.id">
    <div class="list-header">
      <input
        v-if="isEditTitle"
        class="form-control input-title"
        type="text"
        ref="inputTitle"
        v-model="inputTitle"
        @blur="onBlurTitle"
        @keyup.enter="onSubmitTitle"
      >
      <div v-else class="list-header-title" @click="onClickTitle">{{data.title}}</div>
    </div>
    <div class="card-list">
      <card-item v-for="card in data.cards" :key="card.id" :card="card"/>
    </div>
    <div v-if="isAddCard">
      <add-card :listId="data.id" @close="hideAddCard"></add-card>
    </div>
    <div v-else>
      <a class="add-card-btn" href="" @click.prevent.stop="showAddCard">
        &plus; Add a card
      </a>
    </div>
  </div>
</template>

<script>
import addCard from './AddCard';
import CardItem from "./CardItem";
import {mapActions} from 'vuex';

export default {
  name: 'List',
  components: {CardItem, addCard},
  props: ['data'],
  data() {
    return {
      isAddCard: false,
      isEditTitle: false,
      inputTitle: '',
    }
  },
  created() {
    this.inputTitle = this.data.title;
  },
  methods: {
    ...mapActions([
      'UPDATE_LIST',
    ]),
    showAddCard() {
      this.isAddCard = true;
    },
    hideAddCard() {
      this.isAddCard = false;
    },
    onClickTitle() {
      this.isEditTitle = true;
      this.$nextTick(() => {
        this.$refs.inputTitle.focus();
      });
    },
    onBlurTitle() {
      this.isEditTitle = false;
    },
    onSubmitTitle() {
      this.onBlurTitle();

      this.inputtitle = this.inputTitle.trim();
      if (!this.inputtitle) return;

      const id = this.data.id;
      const title = this.inputTitle;

      if(title === this.data.title) return;

      this.UPDATE_LIST({id, title});
    },
  },
}
</script>

<style>
.list {
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
}
.list-header {
  flex: 0 0 auto;
  height: 30px;
  padding: 10px 8px 8px;
  position: relative;
}
.list-header-title {
  font-size: 16px;
  font-weight: 700;
  padding-left: 8px;
  line-height: 30px;
}
.input-title {
  width: 90%;
}
.delete-list-btn {
  position: absolute;
  right: 10px;
  top: 8px;
  text-decoration: none;
  color: #aaa;
  font-size: 24px;
}
.card-list {
  flex: 1 1 auto;
  overflow-y: scroll;
}
.empty-card-item   {
  height: 10px;
  width: 100%;
  background-color: rgba(0,0,0, 0);
}
.add-card-btn {
  flex: 0 0 auto;
  display: block;
  padding: 8px 10px;
  color: #8c8c8c;
  text-decoration: none;
}
.add-card-btn:focus,
.add-card-btn:hover {
  background-color: rgba(0,0,0, .1);
}
</style>
