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
        type="number"
    ></v-text-field>
  </v-sheet>
</template>

<script>
export default {
  name: "NumberField",
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
