<template>
  <div class="markmovie">
    <VerificationComponent v-if="!verified"></VerificationComponent>
    <AdminComponent v-else></AdminComponent>
  </div>
</template>

<script>
// @ is an alias to /src
import VerificationComponent from '@/components/VerificationComponent.vue'
import AdminComponent from '@/components/AdminComponent.vue'

export default {
  name: 'MarkMovie',
  components: {
    VerificationComponent,
    AdminComponent
  },
  data () {
    return {
      movieRID: 0,
      movie: {}
    }
  },
  created: function() {

  },
  methods: {
    
  }
}
</script>

<style scoped lang="scss">

</style>

