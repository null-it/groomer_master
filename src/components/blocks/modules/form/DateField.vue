<template>
  <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      min-width="290px"
      offset-y
      transition="scale-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          v-model="date"
          v-bind="attrs"
          v-on="on"
          :label="field.label"
          prepend-icon="mdi-calendar"
          readonly
          persistent-hint
          :error-messages="field.someError"
      ></v-text-field>
    </template>
    <v-date-picker

        v-model="date"
        @change="save"
        no-title
        :locale="$i18n.locale"
        min="2020-01-01"

    ></v-date-picker>
  </v-menu>
</template>

<script>
import format from "date-format";

export default {
  name: "DateField",
  props: ['field'],
  data: () => ({
    date: null,
    menu: false,
  }),
  mounted() {
    let val = new Date(this.field.value * 1000)
    //this.date = val.getFullYear() + "-" + (val.getMonth() < 9 ? "0" + (val.getMonth() + 1) : (val.getMonth() + 1)) + "-" + (val.getDate() < 10 ? "0" + val.getDate() : val.getDate())
    this.date = format('yyyy-MM-dd', val)
  },

  watch: {

    date(val) {
      this.field.value = new Date(val).getTime() / 1000
    }
  },
  methods: {
    save(date) {
      this.field.someError = [];
      this.$refs.menu.save(date)
    },
  },
}
</script>

<style scoped>

</style>
