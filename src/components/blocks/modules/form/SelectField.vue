<template>
  <v-select
      v-model="computedValue"
      v-bind="field"
      :no-data-text="$t('app.fields.select.noData')"
      :error-messages="someError"
  ></v-select>
</template>

<script>
export default {
  name: "SelectField",
  props: ['field', 'value', 'someError'],
  model: {
    prop: 'value',
    event: 'input'
  },
  computed: {
    computedValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
}
</script>

<style scoped>

</style>
