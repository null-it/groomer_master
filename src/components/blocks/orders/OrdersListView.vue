<template>
  <section>
    <div v-if="orders.length === 0" class="mx-auto text-center">
      <h3>{{ $t('app.pages.orders.noOrders') }}</h3>
    </div>

    <v-data-table
        v-if="orders.length > 0"
        :headers="headers"
        :items="orders"
        class="elevation-0"
        item-key="id"
    >
      <template
          v-slot:item.working_diapason="{ item }">
        {{ formattedDate(item) }}
      </template>
      <template
          v-slot:item.service="{ item }">
        {{ getServiceName(item) }}
      </template>
      <template
          v-slot:item.master="{ item }">
        {{ item.working_diapason.master.name }}
      </template>
      <template
          v-slot:item.pet_type="{ item }">
        {{ getPetType(item) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <add-item-button-with-popup color="transparent" :buttonWithoutText="true">
          <template v-slot:item>
            #{{ item.id }}
          </template>
          <template v-slot:icon>
            <v-icon>mdi-pencil</v-icon>
          </template>


          <template v-slot:component>
            <orders-edit-form :id="item.id"></orders-edit-form>
          </template>
        </add-item-button-with-popup>
      </template>


    </v-data-table>
  </section>
</template>

<script>

import AddItemButtonWithPopup from "@/components/blocks/modules/ui/AddItemButtonWithPopup";
import {ApiClient, OrderApi} from "groomer-js-api";
import ResponseMessage from "@/plugins/ApiResponse";
import OrdersEditForm from "@/components/blocks/orders/OrdersEditForm";
import format from "date-format"

export default {
  name: "OrdersListView",
  components: {OrdersEditForm, AddItemButtonWithPopup},
  data: () => ({
    orders: [],
    headers: [
      {
        text: 'Клиент',
        align: 'start',
        sortable: false,
        value: 'owner_name',
      },
      {
        text: 'Питомец',
        align: 'start',
        sortable: false,
        value: 'pet_name',
      },
      {
        text: 'Тип питомца',
        align: 'start',
        sortable: false,
        value: 'pet_type',
      },
      {
        text: 'Время визита',
        align: 'start',
        sortable: false,
        value: 'working_diapason',
      },
      {
        text: 'Телефон',
        align: 'start',
        sortable: false,
        value: 'phone',
      },
      {
        text: 'Комментарий',
        align: 'start',
        sortable: false,
        value: 'comment',
      },
      {
        text: 'Мастер',
        align: 'start',
        sortable: false,
        value: 'master',
      },
      {
        text: 'Услуга',
        align: 'start',
        sortable: false,
        value: 'service',
      },
      {
        text: 'Действия',
        align: 'start',
        sortable: false,
        value: 'actions',
      },
    ]
  }),
  methods: {
    fetch() {
      this.$parent.$emit('loaderChange', true)
      let defaultClient = ApiClient.instance;
      let apiInstance = new OrderApi();
      let bearerAuth = defaultClient.authentications['bearerAuth'];
      bearerAuth.accessToken = this.$store.state.bearer

      let master = this.$store.state.user;

      apiInstance.clientClientIDOrderGet(master.client_id, null, (error, data, response) => {
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
          this.orders = []
          for (const id in response.body.response) {
            let item = response.body.response[id]
            this.orders.push(item)
          }
          this.$parent.$emit('loaderChange', false)
          this.$store.commit('setServerDataUpdated', {orders: false})
          this.$store.commit('alertAdd', {
            shown: true,
            color: 'green',
            text: this.$t('app.messages.notifications.successfullyGetList'),
            timeout: 2000
          })
        }
      })
    },
    formattedDate(item) {
      let date = new Date(item.working_diapason.time_start * 1000)
      return format('yyyy/MM/dd hh:mm', date)
    },
    getServiceName(item) {
      if (item.services.length === 0) {
        return "Нет услуг"
      }
      return item.services.length > 1 ? 'Несколько услуг (' + item.services.length + ')' : item.services[0].name
    },
    getPetType(item) {
      switch (item.pet_type) {
        case 0:
          return this.$t('app.pages.orders.table.header.petType.cat')
        case 1:
          return this.$t('app.pages.orders.table.header.petType.dog')
        default:
          return this.$t('app.pages.orders.table.header.petType.other')
      }
    }
  },
  created() {
    this.fetch()
  },
  watch: {
    dataUpdated(state) {
      if (state) {
        this.fetch()
      }
    }
  },
  computed: {
    dataUpdated() {
      return this.$store.state.serverDataUpdated.orders
    }
  }
}
</script>

<style scoped>

</style>
