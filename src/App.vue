<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Jakes & Sebastians Movie Bucketlist</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Draw a movie</b-nav-item>
          <b-nav-item to="movie">Mark movie</b-nav-item>
          <b-nav-item to="admin">Admin</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
export default {
  computed: {
  }
}
</script>

<style lang="scss">
$body-bg: #1f2226;
// $body-bg: transparent;
$body-color: #e6e6e6;
$enable-gradients: true;

// Bootstrap and its default variables
@import '../node_modules/bootstrap/scss/bootstrap';
// BootstrapVue and its default variables
@import '../node_modules/bootstrap-vue/src/index.scss';

</style>
