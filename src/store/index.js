import Vue from 'vue';
import Vuex from 'vuex';
import {Board} from '../api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isShowAddBoard: false,
    boards: [],
  },
  mutations: {
    SET_IS_SHOW_ADD_BOARD(state, value) {
      state.isShowAddBoard = value;
    },
    SET_BOARDS(state, boards) {
      state.boards = boards;
    }
  },
  actions: {
    ADD_BOARD(_, {title}) {
      return Board.create(title);
    },
    FETCH_BOARDS({commit}) {
      return Board.fetch().then(data => {
        commit('SET_BOARDS', data.list);
      })
    }
  }
});

export default store;
