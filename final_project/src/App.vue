<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { auth } from 'boot/firebase';

export default {
  name: 'App',
  created() {
    auth.onAuthStateChanged(user => {
      if (!user && this.$route.meta.requiresAuth) {
        this.$router.push('/')
      }
    })
  }
}
</script>
