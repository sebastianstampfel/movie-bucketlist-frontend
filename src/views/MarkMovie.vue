<template>
  <div class="markmovie">
    <loading :active.sync="isLoading"
    :can-cancel="false"
    :is-full-page="true"
    :color="loaderColor"
    :loader="loaderType" ></loading>

    <div v-if="!showMovie" class="lookup-box">
        <b-row>
            <b-col cols=12>
                <h2>Find movie</h2>
            </b-col>
            <b-col>
                <b-form>
                    <b-form-group
                        id="input-group-1"
                        label="Movie RID"
                        label-for="input-1"
                        description="Enter RID from paper drawn from glass"
                    >
                        <b-form-input
                        id="input-1"
                        v-model="movieRID"
                        type="number"
                        required
                        placeholder="Enter RID"
                        ></b-form-input>
                    </b-form-group>

                    <b-button @click.prevent="clickHandler" variant="warning">Submit</b-button>
                </b-form>
            </b-col>
        </b-row>
    </div>
    <div v-else>
      <MovieComponent :movie=movie></MovieComponent>
      <b-row class="utils">
        <b-col cols=6>
          <b-button variant="warning" v-on:click=onClickMarkWatched>{{ markButtonText }}</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import MovieLookupComponent from '@/components/MovieLookupComponent.vue'
import Loading from 'vue-loading-overlay';
import MovieComponent from '@/components/MovieComponent.vue'

export default {
  name: 'MarkMovie',
  components: {
    MovieComponent,
    Loading
  },
  data () {
    return {
      movieRID: null,
      movie: {},
      showMovie: false,
      markButtonText: 'Mark as watched',
      isLoading: false,
      loaderColor: "#E4AE0B",
      loaderType: "dots"
    }
  },
  created: function() {

  },
  methods: {
    clickHandler: function(){
      this.isLoading = true
      const base = this.$movieListBaseUrl
      this.$http.get(base + "/movie/rid/" + this.movieRID)
      .then((result) => {
          if(result.data == ""){
            this.$bvToast.toast(`No movie with RID ${this.movieRID} in databse`, {
              title: `Movie not found`,
              variant: "danger",
              solid: false
            })
            this.isLoading = false
          } else {
            this.movie = result.data
            this.showMovie = true
            this.isLoading = false
          }
      })
    },
    onClickMarkWatched: function() {
      this.isLoading = true
      const base = this.$movieListBaseUrl

      console.log("Got this far")
      this.markButtonText = 'Marking...'

      this.$http.put(base + '/set-watched', {
        movieId: this.movie.Ranking
      }).then((result) => {
        if(result.data[0].Watched == 1){
          this.markButtonText = 'Marked!'
          this.isLoading = false
        } else {
          this.markButtonText = 'Error!'
          this.isLoading = false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.lookup-box {
  margin-top: 2em;
}

.utils {
  margin-top: 2em;
}
</style>

