<template>
  <div>
    <div class="loading" v-if="!loadingplaylists">
      <i class="fa fa-spinner fa-spin"></i>
    </div>
    <div v-if="loadingplaylists" class="notloading">
      <lib-playlists-default
        id="defaultscreen"
        v-if="playlists1.length == 0 && songs1.length == 0"
      />
      <h2 v-if="playlists1.length">Playlists</h2>
      <div class="container">
        <div class="row">
          <lib-likedsongs />
          <lib-playlists
            v-for="playlist in playlists1"
            :key="playlist.id"
            :images="
              $url +
                '/api/images/' +
                playlist.images[0]._id +
                '?belongs_to=playlist'
            "
            :name="playlist.name"
            :ownerName="playlist.owner"
            :playlist_id="playlist.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  i {
    color: #fff;
    font-size: 70px;
    margin-top: 100px;
  }
}
h2 {
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-bottom: 14px;
  margin-left: 30px;
  margin-top: 38px;
}
.container {
  margin-left: 15px;
}
</style>

<script>
import LibPlaylistsDefault from "@/components/LibPlaylistsDefault.vue";
import LibPlaylists from "@/components/LibPlaylists.vue";
import LibLikedsongs from "@/components/LibLikedSongs.vue";
import { mapGetters } from "vuex";
/**
 * playlists saved by the user and stored inside his library
 * @displayName Library playlists page
 * @example [none]
 */
export default {
  name: "library-playlists",
  components: {
    LibPlaylistsDefault,
    LibPlaylists,
    LibLikedsongs
  },
  mounted() {
    this.$store.dispatch("Playlist/showplaylists");
    this.$store.dispatch("UserLibrary/showUserSongs");
  },
  computed: {
    ...mapGetters({
      // map `this.playlists1` to `this.$store.getters.playlists`
      playlists1: "Playlist/playlists", // creat new object "playlists1" and map to it
      songs1: "UserLibrary/songs",
      loadingplaylists: "Playlist/loadingplaylists"
    })
  }
};
</script>
