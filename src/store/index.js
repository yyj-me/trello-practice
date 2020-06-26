import Vue from 'vue';
import Vuex from 'vuex';
import {Board} from '../api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isShowAddBoard: false,
  },
  mutations: {
    SET_IS_SHOW_ADD_BOARD(state, value) {
      state.isShowAddBoard = value;
    }
  },
  actions: {
    ADD_BOARD(_, {title}) {
      return Board.create(title);
    }
  }
});

export default store;
