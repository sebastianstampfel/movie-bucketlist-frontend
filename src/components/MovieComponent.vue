<template>
  <div class="hello">
    <div class="backdrop" :style="cssVars"></div>
    <b-row class="header">
      <b-col>
        <h2 style="margin-bottom: .75em;">Today, you'll be watching <span class="ranking-number">No. {{ movie.Ranking }}</span> of the World's Top 100 Movies:</h2>
        <!-- <h1 class="movie-name">{{ movie.Name }}</h1> -->
        <a class="movie-title">{{ movie.Name }}</a>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols=6 sm=7 md=5 lg=12 xl=4>
        <b-img class="shadow" :src=$movieApiImageBaseUrl+movieDetails.poster_path rounded fluid alt="Responsive image"></b-img>
      </b-col>
      <b-col cols=6 sm=5 md=7 lg=4 xl=8>
        <h4 style="">Released in: {{movie.Year}}</h4>
        <p>{{ movieDetails.overview }}</p>
        <p class="rid">RID: {{movie.RID}}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'MovieComponent',
  props: {
    movie: {}
  },
  data(){
    return {
      details: {}
    }
  },
  created: function() {
    console.log("Movie comp created")
  },
  asyncComputed: {
    movieDetails: {
      get () {
        return this.$http.get(this.$movieApiBaseUrl + '/search/movie', 
        { 
          params: { 
            api_key: this.$movieApiKey,
            language: 'en-US',
            query: this.movie.Name,
            page: 1,
            include_adult: true,
            year: this.movie.Year
            }
          })
        .then(result => {
          this.details = result.data.results[0]
          return result.data.results[0]
        })
      },
      default () {
        return 'Loading movie details'
      }
    },
    cssVars: {
      get() {
        const backdropUrl = this.$movieApiImageBaseUrl + this.details.backdrop_path
        const retVal = {
          'background-image': 'url("' + backdropUrl + '")',
          'background-size': 'cover',
          'background-repeat': 'no-repeat'
        }
        this.$bodyBackgroundCss = retVal
        return new Promise(function(resolve){
          resolve(retVal)
        })
      },
      default() {
        return {"background-color": "#1f2226"}
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.backdrop{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  //padding: 1em 49.5vw 1em 49.5vw;
  overflow: hidden;
  z-index: -1;
  filter: blur(15px) brightness(0);
  -webkit-filter: blur(8px) brightness(0.5);
}

.ranking-number{
  font-weight: 700;
  color: #E4AE0B;
}

.rid {
  font-style: italic;
  color: #79797993;
  text-align: center;
  margin-bottom: 0;
  //padding-top: 0.5em;
}

.header {
  text-align: center;
  margin-bottom: 2em;
  margin-top: 3em;
}

.shadow {
  -webkit-box-shadow: 10px 10px 20px -9px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 20px -9px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 20px -9px rgba(0,0,0,0.75);
}

.movie-title{
  position:        relative;
  color:           #E6E6E6;
  text-decoration: none;
  font-weight: 700;
  font-size: 3em;
}

.movie-title:after{
  content:    "";
  position:   absolute;
  left:       0;
  bottom:     10px;      /* Control bottom position */
  width:      100%;
  height:     8px;       /* Set your desired thickness */
  background: #E4AE0B;
  z-index: -1;
}
</style>
