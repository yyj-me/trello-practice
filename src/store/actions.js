import {Auth, Board, Card} from "../api";

const actions = {
  LOGIN({commit}, {email, password}) {
    return Auth.login(email, password)
      .then(({accessToken}) => commit('LOGIN', accessToken));
  },
  ADD_BOARD(_, {title}) {
    return Board.create(title).then(data => data.item);
  },
  FETCH_BOARDS({commit}) {
    return Board.fetch().then(data => {
      commit('SET_BOARDS', data.list);
    })
  },
  FETCH_BOARD({commit}, {id}) {
    return Board.fetch(id).then(data => {
      commit('SET_BOARD', data.item);
    })
  },
  ADD_CARD({dispatch, state}, {title, listId, pos}) {
    return Card.create(title, listId, pos)
      .then(_ => dispatch('FETCH_BOARD', {id: state.board.id}));
  },
  FETCH_CARD({commit}, {id}) {
    return Card.fetch(id)
      .then(data => {
        commit('SET_CARD', data.item);
      });
  },
  UPDATE_CARD({dispatch, state}, {id, title, description, pos, listId}) {
    return Card.update(id, {title, description, pos, listId})
      .then(_ => dispatch('FETCH_BOARD', {id: state.board.id}));
  },
  DELETE_CARD({dispatch, state}, {id}) {
    return Card.destroy(id)
      .then(_ => dispatch('FETCH_BOARD', {id: state.board.id}));
  },
};

export default actions;
