<template>
    <b-row>
        <loading :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true"
        :color="loaderColor"
        :loader="loaderType" ></loading>

        <b-col cols="12">
            <div class="admin-box">
                <b-card bg-variant="dark" text-variant="light" no-body>
                    <b-tabs pills card>
                        <b-tab title="List" style="padding: 0;" active>
                            <b-card-text style="padding: 0;">
                                <b-table striped hover :items="movies">
                                    <template #cell(Watched)="data">
                                        <b-row>
                                            <b-col cols=4 style="padding: 0;">
                                                <b v-if="data.item.Watched == 1" class="text-warning">Yes</b>
                                                <b v-else class="text-danger">No</b>
                                            </b-col>
                                            <b-col cols="5" style="padding: 0;">
                                                <b-badge v-if="data.item.Watched == 1" pill variant="danger" v-on:click=unsetWatchState(data.item.Ranking)>Toggle</b-badge>
                                                <b-badge v-else pill variant="warning" v-on:click=setWatchState(data.item.Ranking)>Toggle</b-badge>
                                            </b-col>
                                        </b-row>
                                    </template>
                                </b-table>
                            </b-card-text>
                        </b-tab>
                        <b-tab title="Stats">
                            <b-card-text>
                                <b-row>
                                    <b-col>
                                        <p><b>Total:</b> {{ movies.length }}</p>
                                        <p><b>Watched:</b> {{ watchedMoviesCount }}</p>
                                        <p><b>Unwatched:</b> {{ unwatchedMoviesCount }}</p>
                                    </b-col>
                                </b-row>
                            </b-card-text>
                        </b-tab>
                        <!-- <b-tab title="Tab 3"><b-card-text>Tab contents 3</b-card-text></b-tab> -->
                    </b-tabs>
                </b-card>
            </div>
        </b-col>
    </b-row>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: 'AdminComponent',
    components: {
        Loading
    },
    data(){
        return {
            verified: false,
            passphrase: '',
            movies: [],
            watchedMoviesCount: 0,
            unwatchedMoviesCount: 0,
            isLoading: false,
            loaderColor: "#E4AE0B",
            loaderType: "dots"
        }
    },
    created: function(){
        this.loadMovieList()
    },
    methods: {
        loadMovieList: function(){
            this.isLoading = true
            const base = this.$movieListBaseUrl
            this.$http.get(base + "/movies")
            .then((result) => {
                this.movies = result.data

                this.movies.forEach((item) => {
                    if(item.Watched == 1){
                        this.watchedMoviesCount++
                    } else {
                        this.unwatchedMoviesCount++
                    }
                })
                this.isLoading = false
            })
        },
        onSubmit: function(){
            if(this.passphrase == "password"){
                this.$cookies.set("MOVIELIST_verified", true)
            }
        },
        unsetWatchState: function(id){
            this.isLoading = true
            const base = this.$movieListBaseUrl

            this.$http.put(base + '/unset-watched', {
                movieId: id
            }).then((result) => {
                if(result.data[0].Watched == 0){
                    this.loadMovieList()
                } else {
                    console.log("Error marking movie as watched")
                    console.log(result)
                }
            })
        },
        setWatchState: function(id){
            this.isLoading = true
            const base = this.$movieListBaseUrl

            this.$http.put(base + '/set-watched', {
                movieId: id
            }).then((result) => {
                if(result.data[0].Watched == 1){
                    this.loadMovieList()
                } else {
                    console.log("Error marking movie as watched")
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.admin-box {
    margin-top: 1em;
    // background: #343A40;
    // padding: 1em;
    // border-radius: 10px;
    // border: 2px solid #E4AE0B;
}
</style>