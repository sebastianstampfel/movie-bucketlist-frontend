<template>
  <div class="home">
    <MovieComponent :movie=movie></MovieComponent>
    <b-row class="utils">
      <b-col xs=6>
        <b-button style="margin-right: .4em;" v-on:click=fetch>Draw again</b-button>
      </b-col>
      <b-col xs=6>
        <b-button variant="warning" v-on:click=onClickMarkWatched>{{ markButtonText }}</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieComponent from '@/components/MovieComponent.vue'

export default {
  name: 'Home',
  components: {
    MovieComponent
  },
  data () {
    return {
      movies: [],
      movie: {},
      markButtonText: 'Mark as watched'
    }
  },
  created: function() {
    const base = this.$movieListBaseUrl
    this.$http.get(base + "/random-movie")
    .then((result) => {
      this.movie = result.data
    })
  },
  methods: {
    fetch: function() {
      this.markButtonText = 'Mark as watched'
      console.log("CLICKED!")
      const base = this.$movieListBaseUrl

      this.$http.get(base + "/movies")
      .then((result) => {
        this.movies = result.data
      })

      this.$http.get(base + "/random-movie")
      .then((result) => {
        this.movie = result.data
      })
    },
    onClickMarkWatched: function() {
      const base = this.$movieListBaseUrl

      console.log("Got this far")
      this.markButtonText = 'Marking...'

      this.$http.put(base + '/set-watched', {
        movieId: this.movie.Ranking
      }).then((result) => {
        if(result.data[0].Watched == 1){
          this.markButtonText = 'Marked!'
        } else {
          this.markButtonText = 'Error!'
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.utils{
  margin-top: 2em;
}
</style>

