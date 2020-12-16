<template>
  <v-textarea
      :key="field.name"
      v-model="field.value"
      v-bind="field"
      @input="handleInput"
      :error-messages="field.someError"
  ></v-textarea>
</template>

<script>
export default {
  name: "TextArea",
  props: ['field'],
  methods: {
    handleInput(val) {
      this.field.someError = [];
      this.$emit('input', val)
    }
  },
}
</script>

<style scoped>

</style>
