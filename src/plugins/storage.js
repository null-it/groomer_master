import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        bearer: null,
        user: null,
        alert: false,
        salon: null,
        serverDataUpdated: {
            bearer: false,
            master: false,
            salon: false,
            salons: false,
            promotions: false,
        },
    },
    mutations: {
        alertAdd(state, val) {
            Vue.set(state, 'alert', val)
        },
        setUser(state, val) {
            state.user = val
            if (val !== null) {
                localStorage.setItem("user", JSON.stringify(val))
            } else {
                localStorage.removeItem('user')
            }
        },
        setBearer(state, value) {
            state.bearer = value
            if (value !== null) {
                localStorage.setItem("bearer", value)
            } else {
                localStorage.removeItem('bearer')
            }

        },
        setServerDataUpdated(state, val) {
            state.serverDataUpdated = val
        },
        setSalon(state, val) {
            state.salon = val
        },
        clear(state) {
            state.bearer = null;
            state.user = null;
            localStorage.removeItem('bearer')
            localStorage.removeItem('user')
        }
    },
})
export default store;