<template>
  <v-container fluid>
    <v-form
      ref="form"
      v-model="valid"
      v-if="master"
    >
      <v-row>
        <v-col
            cols="12"
        >

            <component
                :is="field.component"
                v-for="field in fields"
                :key="field.name"
                ref="field.ref"
                v-model="field.value"
                :field="field"
            ></component>

        </v-col>

      </v-row>
      <v-row no-gutters>
        <v-btn color="purple darken-3" dark @click.stop="updateMaster">
          {{ this.$i18n.t("app.base.update") }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import {ApiClient, MasterApi} from "groomer-js-api";
import TextField from "@/components/blocks/modules/form/TextField";
import TextArea from "@/components/blocks/modules/form/TextArea";
import FileField from "@/components/blocks/modules/form/FileField";
import ScheduleField from "@/components/blocks/modules/form/ScheduleField";
import ResponseMessage from "@/plugins/ApiResponse";

export default {
  name: "MastersEditForm",
  props: ['id'],
  data() {
    return {
      show1: false,
      valid: false,
      master: null,
      fields: {
        name: {
          value: "",
          rules: [
            v => v.length <= 128 || this.$i18n.t("app.base.errors.name_too_large"),
          ],
          length: 128,
          type: "text",
          label: "Имя мастера",
          required: true,
          icon: null,
          component: TextField,
          someError: []
        },
        email: {
          value: "",
          length: 128,
          type: "text",
          label: "Электронная почта мастера (логин для входа)",
          required: true,
          icon: null,
          component: TextField,
          // filesSelected: () => {
          //   alert(12)
          // },
          someError: []
        },
        password: {
          value: "",
          rules: [],
          length: 0,
          type: 'text',
          label: "Новый пароль для входа",
          required: true,
          icon: null,
          component: TextField,
          click: {
            append: () => {
              this.show1 = !this.show1
            }
          },
          someError: []
        },
        phone: {
          value: "",
          rules: [
            v => v.length <= 20 || this.$i18n.t("app.base.errors.phone_too_large"),
          ],
          length: 20,
          type: "text",
          label: this.$i18n.t("app.pages.masters.fields.phone"),
          required: true,
          icon: null,
          component: TextField,
          someError: []
        },
        image_upload: {
          value: "",
          defaultValue: null,
          label: this.$i18n.t("app.pages.masters.fields.image_upload"),
          component: FileField,
        },
        description: {
          value: "",
          rules: [
            v => v.length <= 255 || this.$i18n.t("app.base.errors.description_too_large"),
          ],
          length: 255,
          type: "text",
          label: this.$i18n.t("app.pages.masters.fields.description"),
          required: true,
          icon: null,
          component: TextArea,
          someError: []
        },
        schedule: {
          value: null,
          component: ScheduleField,
        },

      },
    }
  },
  created() {
    this.checkBearer();
    this.fetch();

  },
  methods: {
    checkBearer() {
      return localStorage.getItem('bearer') ? null : this.$router.push({name: 'login'})
    },
    fetch() {
      this.$parent.$emit('loaderChange', true)

      let defaultClient = ApiClient.instance;

      defaultClient.defaultHeaders = {
        "Accept": "application/json",
        "Authorization": "Bearer " + this.$store.state.bearer
      }
      let apiInstance = new MasterApi();
      let bearerAuth = defaultClient.authentications['bearerAuth'];
      bearerAuth.accessToken = this.$store.state.bearer

      let master = this.$store.state.user;

      apiInstance.clientClientIDMasterMasterIDGet(master.client_id, master.id, (error, data, response) => {

        if (error) {
          if (response.statusCode == 413){
            this.$store.commit(
                "alertAdd",
                {
                  text: this.$i18n.t("app.base.errors.big_file"),
                  shown: true,
                  color: 'red',
                  timeout: 2000
                })
          }else{
            for (let id in response.body.errors) {
              if (this.fields[id]){
                this.fields[id].someError = response.body.errors[id];
                response.body.errors[id] = null;
              }
            }

            let text = ResponseMessage.prepareFromError(response)
            if (text)
              this.$store.commit(
                  "alertAdd",
                  {
                    text: text,
                    shown: true,
                    color: 'red',
                    timeout: 2000
                  })
          }
        } else {
          this.master = data.response
          for (const fieldKey in this.fields) {
            if (Object.keys(this.master).includes(fieldKey)) {
              this.$set(this.fields[fieldKey], 'value', this.master[fieldKey])
            }
          }
          if (this.master.image) {
            this.fields.image_upload.defaultValue = this.master.image
          }

          this.$parent.$emit('loaderChange', false)
          this.$store.commit('alertAdd', {
            shown: true,
            color: 'green',
            text: this.$t('app.messages.notifications.successfullyGet'),
            timeout: 2000
          })
        }
      })
    },
    updateMaster: function () {
      this.$parent.$emit('loaderChange', true)
      let opts = {}
      opts.id = this.$store.state.user.id
      opts.description =  this.fields.description.value
      opts.email = this.fields.email.value
      opts.imageUpload = this.fields.image_upload.value || null
      opts.name = this.fields.name.value
      opts.password = this.fields.password.value || null
      opts.phone = this.fields.phone.value || null
      opts.salonId = this.$store.state.salon
      opts.schedule = this.fields.schedule.value

      let defaultClient = ApiClient.instance;

      defaultClient.defaultHeaders = {
        "Accept": "application/json",
      }
      let apiInstance = new MasterApi();
      let bearerAuth = defaultClient.authentications['bearerAuth'];
      bearerAuth.accessToken = this.$store.state.bearer

      let master = this.$store.state.user;

      apiInstance.clientClientIDMasterMasterIDPatch(master.client_id, this.$store.state.user.id, opts, (error, data, response) => {
        if (error) {
          if (response.statusCode == 413){
            this.$store.commit(
                "alertAdd",
                {
                  text: this.$i18n.t("app.base.errors.big_file"),
                  shown: true,
                  color: 'red',
                  timeout: 2000
                })
          }else{
            for (let id in response.body.errors) {
              if (this.fields[id]){
                this.fields[id].someError = response.body.errors[id];
                response.body.errors[id] = null;
              }
            }

            let text = ResponseMessage.prepareFromError(response)
            if (text)
              this.$store.commit(
                  "alertAdd",
                  {
                    text: text,
                    shown: true,
                    color: 'red',
                    timeout: 2000
                  })
          }
        } else {
          this.master = response.body.response

          this.$store.commit('alertAdd', {
            shown: true,
            color: 'green',
            text: this.$t('app.messages.notifications.successfullyPatch'),
            timeout: 2000
          })
          this.$parent.$emit('loaderChange', false)
          this.$store.commit('setServerDataUpdated', {master: true})
          this.$parent.$emit('itemUpdated')
        }
      })

    }
  }
}
</script>
