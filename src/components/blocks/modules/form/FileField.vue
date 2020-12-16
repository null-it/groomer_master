<template>
  <v-sheet class="pt-2">
    <v-file-input
        :label="field.label"
        v-model="tmpImageSrc"
        :error-messages="field.someError"
        @change="tmpImage"
        prepend-icon="mdi-camera"
    />
    <v-img
        v-if="url"
        :src="url"
        max-height="200px"
        max-width="200px"
        class="my-3 mx-auto"
    ></v-img>
<!--    <v-btn block dark color="purple darken-3" @click="$refs.input.click()"> Выбрать файл</v-btn>-->
  </v-sheet>
</template>

<script>
export default {
  name: "FileField",
  props: ['field', 'value'],
  data:()=>({
    tmpImageSrc: null,
    url: null,
  }),
  created() {
    // if(this.field.defaultValue){
    //   this.tmpImageSrc = this.field.defaultValue
    // }
  },
  model:{
    prop: 'value',
    event: 'input'
  },
  methods: {
    handleInput(val){
      this.$emit('input', val)
    },
    tmpImage(){
      if (this.tmpImageSrc) {
        this.field.someError = [];
        this.url = URL.createObjectURL(this.tmpImageSrc)
        this.handleInput(this.tmpImageSrc)
      }else{
        this.url = null;
        this.tmpImageSrc = null;
        this.handleInput(this.tmpImageSrc)
      }
    }
  },
}
</script>

<style scoped>

</style>
