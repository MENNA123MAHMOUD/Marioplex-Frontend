<template>
  <div v-if="loadingsearch">
    <div v-if="search_value.length !== 0" class="cont last">
      <!--search results-->
      <div class="row">
        <div v-if="match_top.length" class="col-lg-4 ">
          <div v-if="match_top[0].type === 'Artist'">
            <top
              v-for="match_to in match_top"
              :key="match_to.id"
              :image="
                $url +
                  '/api/images/' +
                  match_to.images[0]._id +
                  '?belongs_to=artist'
              "
              :name="match_to.name"
              :type="match_to.type"
              :artistId="match_to._id"
            ></top>
          </div>
          <div v-if="match_top[0].type === 'Album'">
            <top
              v-for="match_to in match_top"
              :key="match_to.id"
              :image="
                $url +
                  '/api/images/' +
                  match_to.images[0]._id +
                  '?belongs_to=album'
              "
              :name="match_to.name"
              :artistId="match_to.artistId"
              :artistName="match_to.artistName"
              :albumId="match_to._id"
              :type="match_to.type"
            ></top>
          </div>
          <div v-if="match_top[0].type === 'playlist'">
            <top
              v-for="match_to in match_top"
              :key="match_to.id"
              :images="
                $url +
                  '/api/images/' +
                  match_to.images[0]._id +
                  '?belongs_to=playlist'
              "
              :name="match_to.name"
              :ownerName="match_to.ownerName"
              :ownerId="match_to.ownerId"
              :type="match_to.type"
              :playlist_id="match_to._id"
              :ownerType="match_to.ownerType"
            ></top>
          </div>
          <div v-if="match_top[0].type === 'Track'">
            <top
              v-for="match_to in match_top"
              :key="match_to.id"
              :images="
                $url +
                  '/api/images/' +
                  match_to.images[0]._id +
                  '?belongs_to=track'
              "
              :name="match_to.name"
              :type="match_to.type"
              :artistName="match_to.artistName"
              :artistId="match_to.artistId"
              :albumId="match_to.albumId"
              :track_id="match_to._id"
            ></top>
          </div>
          <div v-if="match_top[0].type === 'user'">
            <top
              v-for="match_to in match_top"
              :key="match_to.id"
              :images="
                $url +
                  '/api/images/' +
                  match_to.images[0]._id +
                  '?belongs_to=user'
              "
              :name="match_to.displayName"
              :type="match_to.type"
              :Id="match_to._id"
            ></top>
          </div>
        </div>
        <div class="col-8" v-if="match_track.length">
          <h2 v-if="match_track.length < 3">Tracks</h2>
          <div @click="change">
            <router-link
              v-if="match_track.length >= 3"
              class="ard-link link track"
              to="/HomeWebPlayer/search/seealltrack"
              testid="seealltrack"
              >Tracks</router-link
            >
          </div>
          <div @click="change">
            <router-link
              v-if="match_track.length >= 3"
              class="ard-link seelink"
              to="/HomeWebPlayer/search/seealltrack"
              testid="seealltrack"
              >SeeAll</router-link
            >
          </div>
          <div class="col-lg-12 col-md-6 col-xs-6 margan">
            <SongComponent
              v-for="track in match_track"
              :key="track.id"
              :song_name="track.name"
              :song_artists="track.artistName"
              :artist_id="track.artistId"
              :song_id="track._id"
              :albumId="track.albumId"
              :song_album="track.albumName"
              :song_length="track.duration"
            ></SongComponent>
          </div>
        </div>
      </div>
      <div v-if="match_artists.length">
        <h2 v-if="match_artists.length < 5">Artist</h2>
        <div @click="change">
          <router-link
            v-if="match_artists.length >= 5"
            class="ard-link link"
            to="/HomeWebPlayer/search/seeallartist"
            testid="seeallartist"
            >Artist</router-link
          >
        </div>
        <div @click="change">
          <router-link
            v-if="match_artists.length >= 5"
            class="ard-link seelink"
            to="/HomeWebPlayer/search/seeallartist"
            testid="seeallartist"
            >SeeAll</router-link
          >
        </div>
        <div class="row">
          <LibArtists
            class="col-lg-10% col-md-60% col-xs-6"
            v-for="match_artist in match_artists"
            :key="match_artist.id"
            :images="
              $url +
                '/api/images/' +
                match_artist.images[0]._id +
                '?belongs_to=artist'
            "
            :name="match_artist.name"
            :artistId="match_artist._id"
            :type="match_artist.type"
          />
        </div>
      </div>
      <div v-if="match_albums.length">
        <h2 v-if="match_albums.length < 5">Album</h2>
        <div @click="change">
          <router-link
            v-if="match_albums.length >= 5"
            class="ard-link link"
            to="/HomeWebPlayer/search/seeallalbum"
            testid="seeallalbum"
            >Album</router-link
          >
        </div>
        <div @click="change">
          <router-link
            v-if="match_albums.length >= 5"
            class="ard-link seelink"
            to="/HomeWebPlayer/search/seeallalbum"
            testid="seeallalbum"
            >SeeAll</router-link
          >
        </div>
        <div class="row">
          <LibAlbums
            class="col-lg-10% col-md-60% col-xs-6"
            v-for="match_album in match_albums"
            :key="match_album.id"
            :images="
              $url +
                '/api/images/' +
                match_album.images[0]._id +
                '?belongs_to=album'
            "
            :name="match_album.name"
            :albumId="match_album._id"
            :artistname="match_album.artistName"
            :artistId="match_album.artistId"
          />
        </div>
      </div>
      <div v-if="match_playlists.length">
        <h2 v-if="match_playlists.length < 5">Playlist</h2>
        <div @click="change">
          <router-link
            v-if="match_playlists.length >= 5"
            class="ard-link link"
            to="/HomeWebPlayer/search/seeallplaylist"
            testid="seeallplaylist"
            >Playlist</router-link
          >
        </div>
        <div @click="change">
          <router-link
            v-if="match_playlists.length >= 5"
            class="ard-link seelink"
            to="/HomeWebPlayer/search/seeallplaylist"
            testid="seeallplaylist"
            >SeeAll</router-link
          >
        </div>
        <div class="row">
          <LibPlaylists
            v-for="match_playlist in match_playlists"
            :key="match_playlist.id"
            :images="
              $url +
                '/api/images/' +
                match_playlist.images[0]._id +
                '?belongs_to=playlist'
            "
            :name="match_playlist.name"
            :ownerName="match_playlist.ownerName"
            :ownerId="match_playlist.ownerId"
            :playlist_id="match_playlist._id"
          />
        </div>
      </div>
      <div v-if="match_users.length">
        <h2 v-if="match_users.length < 5">Profile</h2>
        <div @click="change">
          <router-link
            v-if="match_users.length >= 5"
            class="ard-link link"
            to="/HomeWebPlayer/search/seealluser"
            testid="seeallartist"
            >Profile</router-link
          >
        </div>
        <div @click="change">
          <router-link
            v-if="match_users.length >= 5"
            class="ard-link seelink"
            to="/HomeWebPlayer/search/seealluser"
            testid="seeallartist"
            >SeeAll</router-link
          >
        </div>

        <div class="row">
          <LibArtists
            class="col-lg-10% col-md-60% col-xs-6"
            v-for="match_user in match_users"
            :key="match_user.id"
            :images="getImg(match_user.images[0])"
            :name="match_user.displayName"
            :artistId="match_user._id"
            :type="match_user.type"
          />
        </div>
      </div>
      <div v-if="!flagfound">
        <p id="noresult">No Results -_-</p>
        <p>please try using a small key words</p>
      </div>
    </div>
    <div></div>
  </div>
</template>
<style scoped>
.margan {
  margin-top: 50px;
}
.track {
  margin-left: 2%;
}
.link {
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
  float: left;
}
#noresult {
  font-size: 40px;
  margin-top: 150px;
  font-style: oblique;
}
p {
  color: white;
  font-size: 20px;
  margin-left: 30%;
}
.row {
  margin-bottom: 15px;
  width: 95%;
}
h2 {
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
  float: left;
}
.seelink {
  font-size: 15px;
  color: white;
  display: inline;
  margin-left: 70%;
}
.last {
  margin-bottom: 200px;
}
</style>
<script>
import LibArtists from "@/components/LibArtists.vue";
import top from "@/components/TopresultCard.vue";
import LibAlbums from "@/components/LibAlbums.vue";
import LibPlaylists from "@/components/LibPlaylists.vue";
import SongComponent from "@/components/SongComponent.vue";
import { mapGetters } from "vuex";
/**
 * Here is the place where results of the search appear
 * @displayName Search Results page
 * @example [none]
 */
export default {
  name: "searchresults",
  components: {
    LibArtists,
    top,
    LibAlbums,
    LibPlaylists,
    SongComponent
  },
  data() {
    return { shower: true };
  },
  computed: {
    ...mapGetters({
      match_top: "Search/gettopres",
      match_artists: "Search/getresult5",
      match_albums: "Search/getalbumres5",
      match_playlists: "Search/getplaylistsres5",
      loadingsearch: "Search/loadingsearch",
      search_value: "Search/get_value",
      match_users: "Search/getuser5",
      match_track: "Search/gettrack3",
      flagfound: "Search/getflagfound"
    })
  },
  methods: {
    /**
     * flag to change to seeall pages
     * @public This is a public method
     */
    change() {
      this.shower = false;
      this.$store.dispatch("Search/showresult", "");
    },
    /**
     * to put image if it is empty
     * @public This is a public method
     */
    getImg(imgSrc) {
      if (typeof imgSrc == "undefined") {
        return "https://dummyimage.com/250x400.jpg/dddddd/000000";
      } else
        return this.$url + "/api/images/" + imgSrc._id + "?belongs_to=user";
    }
  }
};
</script>
