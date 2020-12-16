<template>
  <v-form
      class="pa-2"
      v-model="valid"
  >
    <v-container>
      <v-card>
        <v-row class="pa-2">
          <v-col>
            <h2>{{ $t('app.pages.new_order.title') }}</h2>
          </v-col>
          <v-col class="d-flex">
            <v-btn class="ml-auto" color="primary" @click.stop="createOrder">
              {{ $t('app.pages.new_order.create') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card>


      <v-row>
        <v-col cols="6">
          <v-card class="mb-2">
            <div class="pa-2">
              <b>{{ $t('app.pages.new_order.step_1') }}</b>
            </div>
            <component
                :is="field.component"
                v-for="field in fields_1"
                :key="field.name"
                ref="field.ref"
                v-model="field.value"
                :field="field"
                class="col col-12"
            ></component>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card class="mb-2">
            <div class="pa-2">
              <b>{{ $t('app.pages.new_order.step_2') }}</b>
            </div>
            <component
                :is="field.component"
                v-for="field in fields_2"
                :key="field.name"
                ref="field.ref"
                v-model="field.value"
                :field="field"
                class="col col-12"
            ></component>
          </v-card>

          <v-card>
            <div class="pa-2">
              <b>{{ $t('app.pages.new_order.step_3') }}</b>
            </div>
            <component
                :is="field.component"
                v-for="field in fields_3"
                :key="field.name"
                ref="field.ref"
                v-model="field.value"
                :field="field"
                class="col col-12"
            ></component>
          </v-card>
        </v-col>
      </v-row>


    </v-container>
  </v-form>
</template>

<script>
import {ApiClient, OrderApi} from "groomer-js-api";
import TextField from "@/components/blocks/modules/form/TextField";
import TextArea from "@/components/blocks/modules/form/TextArea";
import WorkingDiapasonSelect from "@/components/blocks/modules/form/WorkingDiapasonSelect";
import ServicesSelectField from "@/components/blocks/modules/form/ServicesSelectField";
import ResponseMessage from "@/plugins/ApiResponse";

export default {
  name: "OrdersCreateForm",

  data() {
    return {
      show1: false,
      valid: false,
      service: null,
      fields_1: {
        owner_name: {
          value: "",
          rules: [
            v => v.length <= 128 || this.$i18n.t("app.pages.new_order.rules.too_long"),
          ],
          length: 128,
          type: "text",
          label: this.$i18n.t("app.pages.new_order.fields.owner_name"),
          required: true,
          icon: null,
          component: TextField,
          someError: []
        },
        phone: {
          value: "",
          rules: [
            v => v.length <= 20 || this.$i18n.t("app.pages.new_order.rules.too_long"),
          ],
          length: 128,
          type: "text",
          label: this.$i18n.t("app.pages.new_order.fields.phone"),
          required: true,
          icon: null,
          component: TextField,
          someError: []
        },
        email: {
          value: "",
          rules: [
            v => v.length <= 20 || this.$i18n.t("app.pages.new_order.rules.too_long"),
          ],
          length: 128,
          type: "text",
          label: this.$i18n.t("app.pages.new_order.fields.email"),
          required: true,
          icon: null,
          component: TextField,
          someError: []

        },
        pet_name: {
          value: "",
          rules: [
            v => v.length <= 20 || this.$i18n.t("app.pages.new_order.rules.too_long"),
          ],
          length: 128,
          type: "text",
          label: this.$i18n.t("app.pages.new_order.fields.pet_name"),
          required: true,
          icon: null,
          component: TextField,
          someError: []
        },
        comment: {
          value: "",
          rules: [
            v => v.length <= 255 || this.$i18n.t("app.pages.new_order.rules.too_long"),
          ],
          length: 255,
          type: "text",
          label: this.$i18n.t("app.pages.new_order.fields.comment"),
          required: true,
          icon: null,
          component: TextArea,
          someError: []
        },
      },
      fields_2: {
        workingDiapasonStartId: {
          type: "text",
          required: true,
          icon: null,
          component: WorkingDiapasonSelect,
        },
      },
      fields_3: {
        services: {
          value: null,
          component: ServicesSelectField,
          someError: []
        },
      }
    }
  },
  // data: () => ({}),
  methods: {
    createOrder: function () {
      //

      if (!this.fields_2.workingDiapasonStartId.value){
        let text = this.$i18n.t("app.pages.new_order.rules.required")
            + ": " + this.$i18n.t('app.pages.masters.select')
            + ", " + this.$i18n.t('app.WDSelect.date')
            + ", " + this.$i18n.t('app.WDSelect.time')

        this.$store.commit(
            "alertAdd",
            {
              text: text,
              shown: true,
              color: 'red',
              timeout: 2000
            })
        return;
      }

      let opts = {};
      opts.working_diapason_start_id = this.fields_2.workingDiapasonStartId.value.id
      opts.owner_name = this.fields_1.owner_name.value
      opts.phone = this.fields_1.phone.value
      opts.email = this.fields_1.email.value || null
      opts.pet_name = this.fields_1.pet_name.value
      opts.services = this.fields_3.services.value.map(item=>item.id)
      opts.comment = this.fields_1.comment.value || null

      let defaultClient = ApiClient.instance;

      defaultClient.defaultHeaders = {
        "Accept": "application/json",
      }
      let apiInstance = new OrderApi();
      let bearerAuth = defaultClient.authentications['bearerAuth'];
      bearerAuth.accessToken = this.$store.state.bearer

      let master = this.$store.state.user;

      apiInstance.clientClientIDOrderPost(master.client_id, opts, (error, data, response) => {
        if (error) {

          // for (let id in this.fields_1) {
          //   this.fields_1[id].someError = [];
          // }

          for (let id in response.body.errors) {
            if (this.fields_1[id]){
              this.fields_1[id].someError = response.body.errors[id];
              response.body.errors[id] = null;
            }
            if (this.fields_3[id]){
              this.fields_3[id].someError = response.body.errors[id];
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
        } else {
          this.$store.commit('alertAdd', {
            shown: true,
            color: 'green',
            text: this.$t('app.messages.notifications.successfullyPost'),
            timeout: 2000
          })
          this.$parent.$emit('loaderChange', true)
          this.$parent.$emit('itemUpdated')
          this.$emit('pageReload')
          this.$store.commit('setServerDataUpdated', {orders: true})
        }
      })

    }
  }
}
</script>

<style scoped>

</style>
