import Vue from 'vue';
import Vuex from 'vuex';
import {Board, Auth, setAuthInHeader} from '../api';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isShowAddBoard: false,
    boards: [],
    token: null,
  },
  getters: {
    isAuth(state) {
      return !!state.token;
    },
  },
  mutations: {
    SET_IS_SHOW_ADD_BOARD(state, value) {
      state.isShowAddBoard = value;
    },
    SET_BOARDS(state, boards) {
      state.boards = boards;
    },
    LOGIN(state, token) {
      if (!token) return;
      state.token = token;
      localStorage.setItem('token', token);
      setAuthInHeader(token);
    },
    LOGOUT(state) {
      state.token = null;
      delete localStorage.token;
      setAuthInHeader(null);
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
    },
    LOGIN({commit}, {email, password}) {
      return Auth.login(email, password)
        .then(({ accessToken }) => commit('LOGIN', accessToken));
    }
  }
});

const { token } = localStorage;
store.commit('LOGIN', token);

export default store;
