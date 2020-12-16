import Vue from 'vue'
import App from '@/App'
import vuetify from './plugins/vuetify';
import router from "@/plugins/router";
import VueMeta from 'vue-meta'
import store from "@/plugins/storage";
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import config from './config'
import {ApiClient} from "groomer-js-api";
import ru from "@/i18n/ru";
import FlagIcon from 'vue-flag-icon';
import VueYoutube from 'vue-youtube'


Vue.use(VueYoutube)
Vue.use(Vuex)
Vue.use(VueI18n)
Vue.use(VueMeta, {
    // optional pluginOptions
    refreshOnceOnNavigation: true
})


const i18n = new VueI18n({
    locale: 'ru', // установка локализации по умолчанию
    messages: {
        ru: ru,
        gb: {language: "English",},
        it: {language: "Italiano",},
        es: {language: "Español",},
    } // установка сообщений локализаций
})

Vue.use(FlagIcon);


Vue.config.productionTip = false
Vue.config.api = ApiClient.instance
//Vue.config.api.basePath = "http://192.168.0.17/api/v1"
Vue.config.api.basePath = "https://grooming-box.com/api/v1"

new Vue({
    vuetify,
    router,
    store,
    i18n,
    config,
    render: h => h(App)
}).$mount('#app')
