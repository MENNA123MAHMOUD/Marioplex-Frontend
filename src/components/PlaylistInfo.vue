<template>
  <div class="playlist_info">
    <div class="image" @mouseover="onhoverimage()" @mouseleave="onleaveimage()">
      <img
        :src="$url + '/api/images/' + playlist_image + '?belongs_to=playlist'"
        alt="playlist_image"
        class="playlist_image"
        id="playlist_image"
        testid="playlistimage"
      />
      <i
        v-if="!play"
        class="fa fa-play"
        id="imageplayicon"
        testid="imageplayicon"
        @click="playSong(), isplaying()"
      >
      </i>
      <i
        v-if="play"
        class="fa fa-pause"
        id="imagepauseicon"
        testid="imagepauseicon"
        @click="pauseSong(), stopplaying()"
      >
      </i>
    </div>
    <div>
      <span data-toggle="tooltip" :title="playlist_name">
        <h2 class="playlistname" testid="playlistname">
          {{ this.playlist_name }}
        </h2>
      </span>

      <router-link to="/" id="owner_name" testid="ownername">{{
        owner_name
      }}</router-link>
    </div>
    <button
      v-if="!play"
      class="playbutton"
      testid="playbutton"
      @click="playSong(), isplaying()"
    >
      PLAY
    </button>

    <!-- /////////////////////////////////////////// -->
    <!-- this comment to try to connect the popup to the user -->
    <!-- <button v-if="!play" class="playbutton" testid="playbutton" @click="checkuserstate()">PLAY</button> -->
    <!-- ////////////////////////////////////// -->

    <button
      v-if="play"
      class="pausebutton"
      testid="pausebutton"
      @click="pauseSong(), stopplayingbutton()"
    >
      PAUSE
    </button>
    <div class="add-library">
      <button
        class="emptyheartbutton"
        testid="emptyheartbutton"
        v-if="!this.liked"
        @click="likecurrentplaylist()"
      >
        <span data-toggle="tooltip" title="Save to Your Library">
          <i
            class="fa fa-heart-o"
            id="emptyhearticon"
            testid="emptyhearticon"
          ></i>
        </span>
      </button>

      <button
        class="filledheartbutton"
        testid="filledheartbutton"
        v-if="this.liked"
        @click="likecurrentplaylist()"
      >
        <span data-toggle="tooltip" title="Remove from Your Library">
          <i
            class="fa fa-heart"
            id="filledhearticon"
            testid="filledhearticon"
            style="color: green;"
          ></i>
        </span>
      </button>
      <p testid="playlistlength" id="playlistlength">
        {{ playlist_length }} SONGS
      </p>
      <div class="toast" id="playlistliketoast" testid="playlisttoast"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.playlist_info {
  width: 100%;
  height: 100%;
  position: absolute;
  text-align: center;
}
.playlist_image {
  height: 350px;
  width: 350px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.playlistname {
  color: white;
  margin: 25px;
  margin-bottom: 5px;
}
button {
  background-color: transparent;
  border: none;
  padding: 10px;
}
.playbutton,
.pausebutton {
  background-color: #1ed760;
  border-radius: 500px;
  width: 120px;
  height: 35px;
  padding: 8px 34px;
  display: inline-block;
  color: white;
  margin: 25px 25px 0px 25px;
  align-content: center;
  font-size: 12px;
  line-height: 18px;
  font-weight: 700;
  letter-spacing: 1.76px;
}
.playbutton:hover,
.pausebutton:hover {
  transform: scale(1.06);
}
.heartbutton {
  background-color: transparent;
  margin: 10px;
}
button:focus {
  outline: 0 !important;
}
.fa {
  color: white;
  font-size: 25px;
}
.add_library {
  display: flex;
  justify-content: space-between;
}
.image {
  position: relative;
  text-align: center;
  align-content: center;
  display: flex;
  justify-content: center;
  #imageplayicon,
  #imagepauseicon {
    opacity: 0;
    position: absolute;
    font-size: 70px;
    font-weight: 1px;
    top: 130px;
    text-align: center;
    color: white;
  }
}
#imageplayicon:hover,
#imagepauseicon:hover {
  transform: scale(1.12);
}
p {
  color: #b3b3b3;
  font-size: 12px;
  letter-spacing: 1.76px;
  font-weight: bold;
  font-size: 12px;
}
.db {
  position: absolute;
  background-color: #282828;
  width: 203px;
  z-index: 1;
  border-radius: 0.25rem;
  right: 20px;
  p {
    color: #b3b3b3;
    margin: 0%;
    padding: 10px 20px;
    font-size: 12px;
    height: 38px;
  }
  p:hover {
    background-color: #313030;
    color: #fff;
    cursor: pointer;
  }
}
#owner_name {
  color: #b3b3b3;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.015em;
}
#owner_name:hover {
  color: white;
}
.toast {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  left: 50%;
  bottom: 100px;
  margin: auto;
  min-width: 300px;
  background-color: rgb(8, 118, 243);
  padding: 10px;
  color: white;
  text-align: center;
  border-radius: 10px;
  z-index: 1;
  box-shadow: 0 0 10 rgb(9, 76, 131);
  transition: opacity 0.2s, visibility 0.2s;
  font-size: 15px;
}
.toast--visible {
  visibility: visible;
  opacity: 1;
}
@media screen and (max-width: 1000px) {
  .playlist_image {
    height: 250px;
    width: 250px;
  }
  .playbutton {
    margin-top: 3px;
    margin-bottom: 3px;
  }
  .pausebutton {
    margin-top: 3px;
    margin-bottom: 3px;
  }
  .playlistname {
    margin-top: 15px;
  }
  .image {
    #imageplayicon,
    #imagepauseicon {
      top: 90px;
    }
  }
}
</style>

<script>
import { default as song_functions } from "../javascript/mediaplayer_script.js";
import { mapGetters } from "vuex";
const toast = {
  show(message) {
    var mytoast = document.getElementById("playlistliketoast");
    //cleartimeout used to reset the 3 seconds every time so not to override time when open another one while the first one is still shown
    clearTimeout(mytoast.hideTimeout);
    mytoast.textContent = message;
    mytoast.className = "toast toast--visible";
    mytoast.hideTimeout = setTimeout(() => {
      mytoast.classList.remove("toast--visible");
    }, 2000);
  }
};
/**
 ** apperars when there is tracks in playlist
 * @displayName Playlist info
 * @example [none]
 */
export default {
  data: function() {
    return {
      show: false,
      play: false
    };
  },
  mixins: [song_functions],
  name: "playlist_info",
  methods: {
    /**
     * start playing song and changes style
     * @public This is a public method
     */
    isplaying() {
      if (this.user == "success") {
        this.play = true;
        if (this.playicon) {
          var playlistimage = document.getElementById("playlist_image");
          var pausebutton = document.getElementById("imageplayicon");
          playlistimage.style.opacity = "0.3";
          pausebutton.style.opacity = "1";
        }
      }
    },
    /**
     * Pauses current song and changes style
     * @public This is a public method
     */
    stopplayingbutton() {
      this.play = false;
      var playlistimage = document.getElementById("playlist_image");
      playlistimage.style.opacity = "1";
      var playbutton = document.getElementById("imagepauseicon");
      playbutton.style.opacity = "0";
    },
    stopplaying() {
      this.play = false;
    },
    /**
     * changes image style on hover
     * @public This is a public method
     */
    onhoverimage: function() {
      var playlistimage = document.getElementById("playlist_image");
      playlistimage.style.opacity = "0.3";
      if (!this.play) {
        var playbutton = document.getElementById("imageplayicon");
        playbutton.style.opacity = "1";
        return {
          img: playlistimage.style.opacity,
          btn: playbutton.style.opacity
        };
      } else {
        var pausebutton = document.getElementById("imagepauseicon");
        pausebutton.style.opacity = "1";
        return {
          btn: pausebutton.style.opacity
        };
      }
    },
    /**
     * returns style to normal(before hover)
     * @public This is a public method
     */
    onleaveimage: function() {
      var playlistimage = document.getElementById("playlist_image");
      playlistimage.style.opacity = "1";
      if (!this.play) {
        var playbutton = document.getElementById("imageplayicon");
        playbutton.style.opacity = "0";
        return {
          img: playlistimage.style.opacity,
          btn: playbutton.style.opacity
        };
      } else {
        playlistimage.style.opacity = "0.3";
        var pausebutton = document.getElementById("imagepauseicon");
        pausebutton.style.opacity = "1";
        return {
          img: playlistimage.style.opacity,
          btn: pausebutton.style.opacity
        };
      }
    },
    /**
     * triggers liking/unliking current playlist request
     * @public This is a public method
     */
    likecurrentplaylist: function() {
      if (this.user != "success") {
        this.$store.dispatch("CheckUserPopup/togglepagespopup");
      } else {
        if (!this.liked) {
          toast.show("Saved to Your Library");
          this.$store.dispatch(
            "Playlist/like_playlist",
            this.$route.params.playlist_id
          );
        } else {
          toast.show("Removed from Your Library");
          this.$store.dispatch(
            "Playlist/unlike_playist",
            this.$route.params.playlist_id
          );
        }
        this.$store.dispatch("Playlist/showplaylists");
      }
    }
  },
  computed: {
    ...mapGetters({
      user: "Authorization/GetStatus",
      playlist_length: "Playlist/playlist_length",
      playlist_name: "Playlist/playlist_name",
      playicon: "Mediaplayer/playicon",
      owner_name: "Playlist/owner_name",
      playlist_image: "Playlist/playlist_image",
      liked: "Playlist/likeplaylist"
    })
  }
};
</script>
