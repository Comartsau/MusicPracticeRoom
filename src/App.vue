<script >
import { RouterLink, RouterView } from 'vue-router'
import Login from './components/Login.vue';
import AdminHome from './views/AdminHome.vue'
import UserHome from './views/UserHome.vue'



export default {
  components: {
    Login,
    AdminHome,
    UserHome
  },
}

</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>

</style>
