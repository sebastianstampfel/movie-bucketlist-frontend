<template>
  <div class="admin">
    <VerificationComponent v-if="!verified"></VerificationComponent>
    <AdminComponent v-else></AdminComponent>
  </div>
</template>

<script>
// @ is an alias to /src
import VerificationComponent from '@/components/VerificationComponent.vue'
import AdminComponent from '@/components/AdminComponent.vue'

export default {
  name: 'Admin',
  components: {
    VerificationComponent,
    AdminComponent
  },
  data () {
    return {
      verified: false
    }
  },
  created: function() {
    if(this.$cookies.isKey("MOVIELIST_verified")){
      this.verified = this.$cookies.get("MOVIELIST_verified")
    }
  },
  methods: {
    
  }
}
</script>

<style scoped lang="scss">

</style>

