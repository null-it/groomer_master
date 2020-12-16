<template>
  <v-sheet>
    <v-text-field
        v-bind="field"
        :value="value"
        @input="handleInput"
        :class="field.hidden ? 'd-none' : ''"
        :error-messages="field.someError"
        hide-details="auto"
        :disabled="field.disabled"
    ></v-text-field>
  </v-sheet>
</template>

<script>
export default {
  name: "TextField",
  props: ['field', 'value'],
  model: {
    prop: 'value',
    event: 'input'
  },
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
