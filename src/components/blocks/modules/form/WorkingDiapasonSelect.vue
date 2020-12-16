<template>
  <v-sheet  color="" tile>
    <w-d-select v-model="wd" :master_id="master.id"></w-d-select>
  </v-sheet>
</template>

<script>
import WDSelect from "@/components/blocks/modules/form/WDSelect";

export default {
  name: "WorkingDiapasonSelect",
  components: {WDSelect},
  props: ['field', 'value'],
  model: {
    props: 'value',
    event: 'input'
  },
  data: () => ({
    master: null,
    wd: null
  }),
  mounted() {
    this.master = this.$store.state.user
    if (this.value) {
      this.wd = this.value
    }
  },
  watch: {
    wd:{
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
        if ((!oldVal && newVal) || (newVal.id !== oldVal.id)) {
          this.$emit('input', newVal)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
