<template>
  <v-sheet>
<!--    <h3>{{ $i18n.t('app.pages.masters.select') }}</h3>-->
    <v-select
        v-model="selectedMaster"
        :items="masters.map(el => ({value: el.id, text: el.name}))"
        :label="$i18n.t('app.pages.masters.select')"
        dense
        hide-details
        class="mb-2"
    ></v-select>

<!--    <v-row>-->
<!--      <v-col-->
<!--          v-for="master in masters"-->
<!--          :key="master.id"-->
<!--          width="50px"-->
<!--          class="text-center"-->
<!--          :class="master.id === selectedMaster ? 'purple lighten-3' : ''"-->
<!--          @click="selectedMaster = master.id"-->
<!--      >-->
<!--        <v-avatar>-->
<!--          <v-img-->
<!--              :src="master.image"-->
<!--          ></v-img>-->
<!--        </v-avatar>-->
<!--        <v-list-item-subtitle>{{master.name}}</v-list-item-subtitle>-->
<!--      </v-col>-->
<!--    </v-row>-->
  </v-sheet>

</template>

<script>
import {ApiClient, MasterApi} from "groomer-js-api";
import ResponseMessage from "@/plugins/ApiResponse";

export default {
  name: "MastersSelect",
  props: ['field','value'],
  model: {
    props: 'value',
    event: 'input'
  },
  data: () => ({
    masters: [],
    selectedMaster: null
  }),
  created() {
    this.fetch()
  },
  methods: {
    applyChange() {
      let master = this.masters.find(item => {
        return item.id === this.selectedMaster
      })
      this.$emit('input', master)
    },

    fetch() {

      let defaultClient = ApiClient.instance;
      let apiInstance = new MasterApi();
      let bearerAuth = defaultClient.authentications['bearerAuth'];
      bearerAuth.accessToken = this.$store.state.bearer

      let client = this.$store.state.user;
      let salon = this.$store.state.salon;

      apiInstance.clientClientIDMasterGet(client.id, salon, null, (error, data, response) => {
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
          for (const id in data.response) {
            let item = data.response[id]
            this.masters.push(item)
          }
          if(this.value){
            this.selectedMaster = this.value
          }

          this.overlay = false

        }
      })
    }
  },
  watch: {
    salonChanged(newSalon, oldSalon) {
      if (newSalon !== oldSalon) {
        this.fetch()
      }
    },
    selectedMaster(){
      this.applyChange()
    }
  },
  computed: {
    salonChanged() {
      return this.$store.state.salon
    }
  },
}
</script>

<style scoped>

</style>
