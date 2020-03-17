import axios from "axios";

 const userPlayLists= {
  state: {
    user_play_lists :[]
  },
  mutations: {
    setUserPlaylist(state, playlists) {
      state.user_play_lists = playlists;
    }
  },
  actions: {
    showplaylists({ commit }) {
      axios
        .get("/api/users")
        .then(response => {
          let playlists = response.data;
          commit("setUserPlaylist", playlists);
        })
        .catch(error => {
          console.log(error);
        });
      },
  },
  getters:{
    playlists: state => state.user_play_lists

  }
}
export default userPlayLists;

