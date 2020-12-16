<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form v-model="valid">
          <v-form
              ref="form"
              v-if="loaded"
          >
            <component
                :is="field.component"
                v-for="(field, index) in fields"
                :key="index"
                v-model="field.value"
                :field="field"
            ></component>
          </v-form>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn :disabled="!valid" color="primary" @click.stop="updateMaster">
          Обновить
        </v-btn>
      </v-col>
      <v-col
        class="d-flex"
      >
        <v-btn color="error" @click.stop="deleteMaster" class="ml-auto">
          Удалить
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {ApiClient, OrderApi} from "groomer-js-api";
import TextField from "@/components/blocks/modules/form/TextField";
import TextArea from "@/components/blocks/modules/form/TextArea";
import WorkingDiapasonSelect from "@/components/blocks/modules/form/WorkingDiapasonSelect";
import ServicesSelectField from "@/components/blocks/modules/form/ServicesSelectField";
import ResponseMessage from "@/plugins/ApiResponse";

export default {
  name: "OrdersEditForm",
  props: ['id'],
  data: () => ({
    show1: false,
    valid: false,
    loaded: false,
    master: null,
    fields: {
      working_diapason: {
        value: null,
        label: "Выбор времени для записи",
        component: WorkingDiapasonSelect,
      },
      owner_name: {
        label: "Имя владельца",
        component: TextField,
      },
      phone: {
        value: "",
        label: "Телефон клиента",
        component: TextField,
      },
      email: {
        value: "",
        label: "Email клиента",
        component: TextField,


      },
      pet_name: {
        value: "",
        label: "Кличка питомца",
        component: TextField,

      },
      services: {
        value: null,
        component: ServicesSelectField,
      },
      comment: {
        value: "",
        label: "Комментарий",
        component: TextArea,
      },
    }
  }),
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      let defaultClient = ApiClient.instance;

      defaultClient.defaultHeaders = {
        "Accept": "application/json",
        "Authorization": "Bearer " + this.$store.state.bearer
      }
      let apiInstance = new OrderApi();
      let bearerAuth = defaultClient.authentications['bearerAuth'];
      bearerAuth.accessToken = this.$store.state.bearer

      let master = this.$store.state.user;

      apiInstance.clientClientIDOrderOrderIDGet(this.id, master.client_id, (error, data, response) => {
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
          this.master = response.body.response

          for (const fieldKey in this.fields) {
            if (Object.keys(this.master).includes(fieldKey)) {
              this.$set(this.fields[fieldKey], 'value', this.master[fieldKey])
            }
          }

          //костыль для услуг
          //todo:переделать нормально
          this.fields.services.value = response.body.response.services
          //console.log(this.fields.services.value)

          this.$store.commit('alertAdd', {
            shown: true,
            color: 'green',
            text: this.$t('app.messages.notifications.successfullyGet'),
            timeout: 2000
          })
          this.$parent.$emit('loaderChange', true)
          this.loaded = true
        }
      })
    },
    deleteMaster: function () {
      let defaultClient = ApiClient.instance;

      defaultClient.defaultHeaders = {
        "Accept": "application/json",
      }
      let apiInstance = new OrderApi();
      let bearerAuth = defaultClient.authentications['bearerAuth'];
      bearerAuth.accessToken = this.$store.state.bearer

      let master = this.$store.state.user;
      apiInstance.clientClientIDOrderOrderIDDelete(this.id, master.client_id, (error, data, response) => {
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
          this.$store.commit('alertAdd', {
            shown: true,
            color: 'green',
            text: this.$t('app.messages.notifications.successfullyDelete'),
            timeout: 2000
          })
          this.$parent.$emit('loaderChange', false)
          this.$parent.$emit('itemUpdated')
          this.$store.commit('setServerDataUpdated', {orders: true})
        }
      })
    },
    updateMaster: function () {
      this.$parent.$emit('loaderChange', true)

      let opts = {}
      opts.working_diapason_start_id = this.fields.working_diapason.value.id
      opts.owner_name = this.fields.owner_name.value
      opts.phone = this.fields.phone.value
      opts.email = this.fields.email.value || null
      opts.pet_name = this.fields.pet_name.value
      opts.services = this.fields.services.value.map(item=>item.id)
      opts.comment = this.fields.comment.value || null
      opts._method = "PATCH"

      let defaultClient = ApiClient.instance;

      defaultClient.defaultHeaders = {
        "Accept": "application/json",
      }
      let apiInstance = new OrderApi();
      let bearerAuth = defaultClient.authentications['bearerAuth'];
      bearerAuth.accessToken = this.$store.state.bearer

      let master = this.$store.state.user;

      apiInstance.clientClientIDOrderOrderIDPatch(this.id, master.client_id, opts, (error, data, response) => {
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
          this.master = response.body.response

          this.$emit('alertShow', {shown: true, text: "Succesfully Uploaded!"})
          this.$parent.$emit('itemUpdated')
          this.$store.commit('setServerDataUpdated', {orders: true})
        }
      })

    }
  }
}
</script>

<style scoped>

</style>
