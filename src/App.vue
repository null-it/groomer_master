<template>
  <v-app class="grey lighten-3">
    <router-view></router-view>
    <div v-if="alert">
      <alert :alert="alert"></alert>
    </div>
  </v-app>
</template>

<script>

import Alert from "@/components/blocks/modules/ui/Alert";
import {ApiClient, OAuthApi} from "groomer-js-api";

export default {
  name: 'App',
  components: {Alert},

  computed: {
    dataUpdated() {
      return this.$store.state.serverDataUpdated.bearer
    },
    salonsUpdated() {
      return this.$store.state.serverDataUpdated.salons
    },
    clientUpdated() {
      return this.$store.state.serverDataUpdated.client
    },

    token() {
      return this.$store.state.bearer
    },
    alert() {
      return this.$store.state.alert
    }
  },
  created() {
    this.checkBearer();
    this.checkUser()
    this.checkLocale()
  },
  updated() {
    this.checkBearer();
    this.checkUser()
    this.checkLocale()
  },
  methods: {
    checkLocale() {
      if (this.$store.state.user?.lang) {
        this.$root.$i18n.locale = this.$store.state.user.lang
      } else if (this.$root.$i18n.availableLocales.includes(window.navigator.language.slice(0,2))){
        this.$root.$i18n.locale = window.navigator.language.slice(0,2)
      }
    },
    checkUser() {
      let user = this.$store.state.user || JSON.parse(localStorage.getItem('user') || "{}")
      if (!user?.id && this.$route.name !== 'login') {
        this.$router.push({name: 'login'}).catch(() => {})
      } else {
        this.$store.commit("setUser", user)
      }
    },
    checkBearer() {
      let localBearer = localStorage.getItem('bearer') || ""
      if (localBearer.length > 0) {
        this.$store.commit("setBearer", localBearer)
      }
      if (this.token === null && !localStorage.getItem('bearer') && this.$route.name !== 'login') {
         this.$router.push({name: 'login'})
      }

    },
    goRedirect: function () {

      let token = this.$store.state.bearer

      if (token === null) {
        switch (this.$route.name) {
          case 'login':
            break;
          default: {
             this.$router.push({name: 'login'})
            break;
          }
        }
      }
      if (token !== null) {
        switch (this.$route.name) {
          case 'login': {
            this.$router.push({name: 'dashboard'})
            break
          }
          default:
            break
        }
      }
    },
    fetch() {
      let apiInstance = new OAuthApi();
      let defaultClient = ApiClient.instance;
      let bearerAuth = defaultClient.authentications['bearerAuth'];
      bearerAuth.accessToken = this.$store.state.bearer


      apiInstance.oauthMeGet((error, data, response) => {
        if (error) {
          this.$store.commit("alertAdd", {
            text: this.$t('app.messages.login.cantGetUser'),
            shown: true,
            color: 'red',
            timeout: 5 * 1000
          })

        } else {
          this.$store.commit("setUser", response.body)

          this.$store.commit('setServerDataUpdated', {bearer: false})
          this.goRedirect()

        }
      });

    }
  },
  watch: {
    dataUpdated(state) {
      if (state) {
        this.fetch()
      }
    },
    clientUpdated(state){
      if (state) {
        this.fetch()
      }
    }

  },
};
</script>
