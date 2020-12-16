<template>
  <v-sheet  color="" tile v-if="master">
    <w-d-select  v-model="wd" :master_id="master.id"></w-d-select>
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
  computed:{
    user(){
      return this.$store.state.user
    }
  },
  mounted() {
    this.master = this.user
    if (this.value) {
      this.wd = this.value
    }
  },
  watch: {
    wd:{
      handler(newVal, oldVal) {
        if ((!oldVal && newVal) || (newVal.id !== oldVal.id)) {
          this.$emit('input', newVal)
        }
      },
      deep: true
    },
    user(newVal){
      if(newVal?.id){
        this.master = this.user
      }
    }
  }
}
</script>

<style scoped>

</style>
