import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import grooming from "@/plugins/grooming";


Vue.use(Vuetify)

const opts = {
    theme: {
        themes: {grooming},
    },
}

export default new Vuetify(opts)
