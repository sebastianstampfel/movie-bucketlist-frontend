import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import AsyncComputed from 'vue-async-computed'

Vue.prototype.$http = axios
/**
 * URL pointing to backend service
 * Make sure to provide backend url in .env file!
 */
Vue.prototype.$movieListBaseUrl = process.env.VUE_APP_MOVIELIST_BACKEND_BASEURL

/**
 * Secret passphrase for admin backend
 */
Vue.prototype.$adminSecret = process.env.VUE_APP_MOVIELIST_ADMIN_SECRET

/**
 * Sets up stuff for.
 * Make sure to provide API-Key in .env file!
 * https://developers.themoviedb.org/
 */
Vue.prototype.$movieApiKey = process.env.VUE_APP_MOVIE_API_KEY
Vue.prototype.$movieApiBaseUrl = process.env.VUE_APP_MOVIEDB_BASEURL

/**
 * Gets config from movie database api.
 * Constructs image base url from options provided.
 */
axios.get( Vue.prototype.$movieApiBaseUrl + '/configuration?api_key=' + Vue.prototype.$movieApiKey)
.then((result) => {
  const totalPosterSizes = result.data.images.poster_sizes.length

  const movieApiImageBaseUrl = result.data.images.base_url 
        + result.data.images.poster_sizes[totalPosterSizes-1]

  Vue.prototype.$movieApiImageBaseUrl = movieApiImageBaseUrl
})

Vue.use(require('vue-cookies'))
Vue.use(AsyncComputed)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
