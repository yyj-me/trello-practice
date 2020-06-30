import {Auth, Board} from "../api";

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
};

export default actions;