<template>
  <v-snackbar
      v-model="alert.shown"
      :color="alert.color || 'black'"
      :timeout="alert.timeout || '-1'"
  >
    {{ alert.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
          v-bind="attrs"
          color="white"
          icon
          @click="alert.shown = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Alert",
  props: ['alert']
}
</script>

<style scoped>

</style>