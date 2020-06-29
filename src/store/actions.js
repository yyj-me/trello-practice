import {Auth, Board} from "../api";

const actions = {
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
      .then(({accessToken}) => commit('LOGIN', accessToken));
  }
};

export default actions;
