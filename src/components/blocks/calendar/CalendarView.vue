<template>
  <v-container fluid full-height>
    <v-sheet
        class="d-flex"
        height="54"
        tile
    >
      <v-btn
          class="ma-2"
          icon
          @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-select
          v-model="type"
          :items="types"
          class="ma-2"
          dense
          hide-details
          label="Вид календаря"
          outlined
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn
          class="ma-2"
          icon
          @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
          ref="calendar"
          v-model="value"
          :event-color="getEventColor"
          :event-overlap-mode="mode.value"
          :event-overlap-threshold="30"
          :events="events"
          :type="type"
          :weekdays="weekday"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
      ></v-calendar>
    </v-sheet>
    <add-item-button-with-popup
        v-if="selectedOpen"
        :buttonWithoutText="true"
        :dark="false"
        :image="selectedEvent.details.image_url"
        color="transparent"
        :open="selectedOpen"
    >
      <template v-slot:item>
        {{ selectedEvent.name }}
      </template>

      <template
          v-slot:component
      >
        <orders-edit-form :id="selectedEvent.details.id"></orders-edit-form>
      </template>
    </add-item-button-with-popup>
  </v-container>
</template>

<script>
import {ApiClient, OrderApi} from "groomer-js-api";
import AddItemButtonWithPopup from "@/components/blocks/modules/ui/AddItemButtonWithPopup";
import ResponseMessage from "@/plugins/ApiResponse";
import OrdersEditForm from "@/components/blocks/orders/OrdersEditForm";

export default {
  name: "CalendarView",
  components: {OrdersEditForm, AddItemButtonWithPopup},
  data: () => ({
    type: 'month',
    focus: '',
    types: [{value: 'month', text: "Месяц"}, {value: 'week', text: "Неделя"}, {value: 'day', text: "День"}],
    select_types: [
      {
        value: 'all',
        text: 'Все'
      },
      {
        value: 'orders',
        text: 'Записи'
      },
      {
        value: 'promotions',
        text: 'Акции'
      }
    ],
    select_type: 'orders',
    mode: 'stack',
    weekday: [1, 2, 3, 4, 5, 6, 0],
    value: '',
    orders: [],
    promotions: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
  }),
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.orders = [];
      this.promotions = [];
      this.getOrders();

    },
    getOrders() {
      const events = []
      let defaultClient = ApiClient.instance;
      let apiInstance = new OrderApi();
      let bearerAuth = defaultClient.authentications['bearerAuth'];
      bearerAuth.accessToken = this.$store.state.bearer
      let master = this.$store.state.user;
      apiInstance.clientClientIDOrderGet(master.client_id, {master_id:master.id}, (error, data, response) => {
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
          for (const id in response.body.response) {
            let promoItem = response.body.response[id]
            events.push({
              name: "#"+promoItem.id,
              start: new Date(promoItem.working_diapason.time_start * 1000),
              end: new Date((promoItem.working_diapason.time_start + 30 * 60) * 1000),
              color: 'purple darken-1',
              timed: true,
              details: promoItem,
              type: "order"
            })
          }
          this.orders = events
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
    getEventColor(event) {
      return event.color
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    showEvent({nativeEvent, event}) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    viewDay({date}) {
      this.focus = date
      this.type = 'day'
    },
  },
  watch: {
    dataUpdated(state) {
      if (state) {
        this.fetch()
      }
    },
    salonChanged(newSalon, oldSalon) {
      if (newSalon !== oldSalon) {
        this.fetch()
      }
    },
    select_type(){
      this.fetch()
    }
  },
  computed: {
    events() {
      return this.promotions.concat(this.orders)
    },
    dataUpdated() {
      return this.$store.state.serverDataUpdated.promotions || this.$store.state.serverDataUpdated.orders
    },
    salonChanged() {
      return this.$store.state.salon
    }

  },
}
</script>

<style scoped>

</style>
