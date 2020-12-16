<template>
  <v-sheet>
    <template v-if="!loadedServices" class="mx-auto text-center">
      <v-progress-circular
          color="purple darken-3"
          indeterminate
          size="18"
          width="2"
      ></v-progress-circular>
    </template>
    <template v-if="loadedServices">
      <select-field
        v-model='selectedType'
        :field='{
          label: $t("app.pages.new_order.services_type"),
          items: [
              {value: 0, text: $t("app.pages.new_order.services_type_cat"),},
              {value: 1, text: $t("app.pages.new_order.services_type_dog"),},
              {value: 2, text: $t("app.pages.new_order.services_type_other")}]
        }'
        :someError="field.someError"
      ></select-field>
      <v-checkbox
          v-for="(item,index) in filteredServices"
          :key="index"
          v-model="item.selected"
          :label="item.name + ' (' + item.price + ')'"
          :value="item.id"
          @change="handleInput"
          dense
      ></v-checkbox>
    </template>
  </v-sheet>
</template>

<script>
import {ApiClient, ServiceApi} from "groomer-js-api";
import ResponseMessage from "@/plugins/ApiResponse";
import SelectField from "@/components/blocks/modules/form/SelectField";

export default {
  name: "ServicesSelectField",
  components: {SelectField},
  props: ['field', 'value'],
  model: {
    prop: 'value',
    event: 'input'
  },
  data: () => ({
    loadedServices: [],
    selectedType: null
  }),
  mounted() {
    this.fetch()
  },
  methods: {
    handleInput(){
      this.field.someError = [];
    },
    fetch() {
      let defaultClient = ApiClient.instance;
      let apiInstance = new ServiceApi();
      let bearerAuth = defaultClient.authentications['bearerAuth'];
      bearerAuth.accessToken = this.$store.state.bearer

      let master = this.$store.state.user;

      apiInstance.clientClientIDServiceGet(master.client_id, null, (error, data, response) => {
        if (error) {
          let text = ResponseMessage.prepareFromError(response)
          this.$store.commit(
              "alertAdd",
              {
                text: text,
                shown: true,
                color: 'red',
                timeout: 2000
              })
        } else {
          let tmpServices = []
          for (const id in data.response) {
            let item = data.response[id]
            if (this.value && this.value.find(servicePreSelected => servicePreSelected.id === item.id)) {
              item.selected = item.id;
              this.selectedType = item.service_type
            }
            tmpServices.push(item)
          }
          this.loadedServices = tmpServices
        }
      })
    },
  },
  computed: {
    selectedServices() {
      return this.filteredServices.filter(item => item.selected)
    },
    filteredServices(){
      return this.loadedServices?.filter(item => item.service_type === this.selectedType)
    },
  },
  watch: {
    selectedServices(services) {
      this.$emit('input', services)
    },
    selectedType(){
      this.field.someError= []
    }
  }
}
</script>

<style scoped>

</style>
