<template>
  <v-sheet v-if="master_id">
    <v-row
    >
      <v-col
          cols="6"
      >
        <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="computedDateFormatted"
                :label="$i18n.t('app.WDSelect.date')"
                persistent-hint
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="selectedDay"
              :allowed-dates="allowedDates"
              :locale="$i18n.locale"
              no-title
              @input="menu2 = false"
          ></v-date-picker>
        </v-menu>

      </v-col>
      <v-col
          cols="6"
          v-if="selectedDay"
      >
        <v-select
            v-model="selectedWD"
            :items="wdListFilteredByDay.map((el) => ({value: el.item, text: formatDate(el.item.time_start, 'hh:mm') }))"
            :label="$i18n.t('app.WDSelect.time')"
        >
        </v-select>
      </v-col>

    </v-row>
  </v-sheet>

</template>

<script>
import {ApiClient, WorkingDiapasonApi} from "groomer-js-api";
import ResponseMessage from "@/plugins/ApiResponse";
import format from "date-format";

export default {
  name: "WDSelect",
  props: ['master_id', 'value'],
  model: {
    props: 'value',
    event: 'input'
  },
  data() {
    return {
      attributes: [],
      wdList: [],
      selectedWD: null,
      selectedDay: null,
      menu2: false,
    }
  },

  created() {
    this.fetch()
  },
  computed:{
    computedDateFormatted () {
      return this.selectedDay
    },
    wdAllowedDates(){
      if(!this.wdList){
        return []
      }
      let output = []

      this.wdList.forEach(item=>{
        const date = new Date(item.time_start * 1000)
        const day = format('yyyy-MM-dd', date)
        output.find(item=>item.day === day) || output.push(day)
      })

      return output;
    },
    wdListDates(){
      if(!this.wdList){
        return []
      }
      let output = []
      this.wdList.forEach(item=>{
        const date = new Date(item.time_start * 1000)
        const day = format('yyyy-MM-dd', date)
        output.find(item=>item.day === day) || output.push({day, active:false})
      })
      return output
    },
    wdListFilteredByDay(){
      if(!this.wdList){
        return []
      }
      let output = []
      this.wdList.forEach(item=>{
        const date = new Date(item.time_start * 1000)
        const day = format('yyyy-MM-dd', date)
        if(this.selectedDay === day){
          output.push({day, item, active:false})
        }

      })
      return output
    }
  },
  watch: {
    master_id: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.fetch()
        this.selectedWD = null
      }
    },
    selectedWD(newVal){
      this.$emit('input',newVal)
    },
  },
  methods: {
    allowedDates(val) {
      return this.wdAllowedDates.find(item=> item === val)
    },
    formatDate(timestamp, formatResult=null) {
      const formatText = formatResult || 'yyyy/MM/dd hh:mm'
      let date = new Date(timestamp * 1000)
      return format(formatText, date)
    },

    fetch() {

      let defaultClient = ApiClient.instance;
      let apiInstance = new WorkingDiapasonApi();
      let bearerAuth = defaultClient.authentications['bearerAuth'];
      bearerAuth.accessToken = this.$store.state.bearer

      let master = this.$store.state.user;

      apiInstance.clientClientIDMasterMasterIDWorkingDiapasonGet(master.id, master.client_id, null, (error, data, response) => {
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
          this.wdList = []
          // for (const id in data.response) {
          //   let item = data.response[id]
          //   this.wdList.push(item)
          // }
          // this.wdList = data.response
          this.wdList = response.body.response
          if(this.value){
            this.selectedDay = this.formatDate(this.value.time_start, 'yyyy-MM-dd')
            this.selectedWD = this.value
          }
          this.overlay = false

        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.outlined{
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0);
  border-radius: 4px;

  &:hover{
    border: 1px solid rgba(0,0,0,.2);
  }
  &.disabled{
    opacity: .2;
  }
}
</style>
