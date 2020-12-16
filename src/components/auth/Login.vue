<template>
  <v-app>
    <v-container class="bg pa-0 pl-md-3 pr-md-3 pt-md-5 pb-md-5" fill-height fluid>
      <v-row align="center"
             justify="center"
             style="z-index: 1"
      >
        <v-col class="d-none d-md-block" cols="0" lg="6" md="8">
          <div class="intro">
            <v-img class="mx-auto my-5" max-width="300" src='~@/assets/logo.png'></v-img>
            <p class="text-center mx-auto" style="max-width: 50%">
              {{ $t('app.pages.login.intro') }}
            </p>
            <v-img class="mx-auto my-auto" src='~@/assets/auth/mobiles.png'></v-img>
          </div>

        </v-col>
        <v-col cols="12" lg="4" md="4">

          <v-card class="ma-0 pa-3 pa-md-8 pa-lg-15 mx-auto" max-width="600">
            <v-overlay
                v-model="loading"
                absolute
            >
              <v-progress-circular
                  indeterminate
              ></v-progress-circular>
            </v-overlay>
            <v-card-title>
              {{ $t('app.pages.login.title') }}
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                    v-model="login"
                    :label="$t('app.pages.login.loginPlaceholder')"
                    required
                    v-on:keyup.enter="doLogin"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    :label="$t('app.pages.login.passwordPlaceholder')"
                    required
                    type="password"
                    v-on:keyup.enter="doLogin"
                ></v-text-field>
                {{ error }}
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn block color="purple darken-3" dark @click="doLogin">{{ $t('app.pages.login.buttonText') }}</v-btn>
            </v-card-actions>
          </v-card>
          <p class="font-weight-light small text-center pt-3 text-caption text--secondary">
            <router-link :to="{name:'restore'}">{{ $t('app.pages.login.restore') }}</router-link>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

import {OAuthApi} from "groomer-js-api";

export default {
  name: "Login",
  metaInfo() {
    return {
      title: this.$i18n.t('app.pages.login.title')
    }
  },
  data: () => ({
    login: 'kosolapus@gmail.com',
    password: '123123123',
    error: null,
    loading: false,
  }),
  created() {
    localStorage.setItem('locale', window.navigator.language.slice(0, 2))
  },
  methods: {

    doLogin: function () {
      this.loading = true
      let apiInstance = new OAuthApi();

      let postData = {
        login: this.login,
        password: this.password
      }

      apiInstance.oauthMasterLoginPost(postData, (error, data) => {
        this.loading = false
        if (error) {
          this.$store.commit(
              "alertAdd",
              {
                text: this.$t('app.messages.login.error'),
                shown: true,
                color: 'red',
                timeout: 20 * 1000
              })

        } else {
          this.$store.commit('setBearer', data.access_token)
          this.$store.commit('setServerDataUpdated', {bearer: true})
        }
      });
    }
  }
}
</script>

<style scoped>
.bg {
  position: relative;
  background-position: bottom;
  background-size: cover;
}

.bg:before {
  content: "";
  position: absolute;
  height: 50vh;
  width: 100%;
  background-color: #6200E8;
  top: 0;
  left: 0;
  z-index: 0;
}

.intro {
  font-size: 15px;
  line-height: 20px;
  color: #fff;
  z-index: 2;
}
</style>
