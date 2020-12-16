<template>
  <p>
    Вы успешно вышли
  </p>
</template>

<script>
export default {
  name: "Logout",
  mounted() {
    this.$store.commit('clear')
    this.$router.push({name: 'login'})
  }
}
</script>

<style scoped>

</style>