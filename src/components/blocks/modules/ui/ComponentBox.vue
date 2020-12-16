<template>
  <v-card
      :class="className || 'ma-6 ma-sm-12'"
      color="white"
      elevation="0"
      tile
      v-on:loaderChange="loaderChange"

  >
    <v-overlay
        v-model="loading"
        absolute
        value="true"
    >
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-card-title v-if="hasSlotTitleOrAction">
      <slot name="title"></slot>
      <v-spacer></v-spacer>
      <slot name="actions" :state="state" :stateToggle="stateToggle"></slot>
    </v-card-title>
    <transition name="component-fade" appear>
      <v-card-text v-if="state">
        <slot></slot>
      </v-card-text>
    </transition>
    <transition name="component-fade" appear>
      <v-card-actions v-if="state">
        <slot name="footer-actions"></slot>
      </v-card-actions>
    </transition>

  </v-card>
</template>

<script>
export default {
  name: "ComponentBox",
  props: ['className', 'defaultState'],
  data: () => ({
    loading: true,
    state: true
  }),
  mounted() {
    if(this.defaultState !== undefined){
      this.state = this.defaultState
    }
  },
  methods: {
    loaderChange(value) {
      this.loading = value
    },
    stateToggle() {
      this.state = !this.state
    }
  },
  computed: {
    hasSlotTitleOrAction() {
      return !!this.$slots['title'] || !!this.$slots['actions']
    }
  }
}
</script>

<style scoped>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>