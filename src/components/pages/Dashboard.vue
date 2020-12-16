<template>
  <section class="d-flex fill-height">

    <v-app-bar
        color="purple darken-3"
        elevation="0"
        flat
        app
    >
      <v-spacer></v-spacer>
      <add-item-button-with-popup color="white" v-if="$store.state.user">
        <template v-slot:item>
          {{ $t('app.pages.orders.addItem')}}
        </template>


        <template v-slot:component>
          <orders-create-form></orders-create-form>
        </template>
      </add-item-button-with-popup>
      <add-item-button-with-popup color="white" v-if="$store.state.user">
        <template v-slot:item>
          {{ $t('app.base.editProfile')}}
        </template>


        <template v-slot:component>
          <masters-edit-form :id="$store.state.user.id"></masters-edit-form>
        </template>
      </add-item-button-with-popup>
      <v-btn rounded @click="doLogout" class="mx-2">{{ $t('app.base.logout')}}</v-btn>

    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container fluid full-height>
        <dashboard-view v-if="$route.name === 'dashboard'"></dashboard-view>
        <router-view v-if="$route.name !== 'dashboard'" v-on:doLogout="doLogout"></router-view>
      </v-container>
    </v-main>
  </section>
</template>

<script>
import DashboardView from "@/components/blocks/dashboard/DashboardView";
import AddItemButtonWithPopup from "@/components/blocks/modules/ui/AddItemButtonWithPopup";
import MastersEditForm from "@/components/blocks/masters/MastersEditForm";
import OrdersCreateForm from "@/components/blocks/orders/OrdersCreateForm";

export default {
  name: "Dashboard",
  components: {
    OrdersCreateForm,
    MastersEditForm,
    DashboardView,
    AddItemButtonWithPopup,
  },
  metaInfo() {
    return {
      title: this.$i18n.t('app.dashboard.title')
    }
  },

  computed: {
    token() {
      return this.$store.state.bearer
    },
  },
  updated() {
    console.log("token", this.token)
    if (!this.token) {
      this.doLogout()
    }
  },
  methods: {
    doLogout() {
      localStorage.clear()
      this.$store.commit('clear')
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style scoped>

</style>
