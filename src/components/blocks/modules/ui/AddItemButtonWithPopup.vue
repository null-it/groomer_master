<template>
  <div class="pa-2">
    <v-dialog
        v-model="dialog"
        max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            v-bind="attrs"
            v-on="on"
            :color="color || 'black'"
            :dark="dark"
            block
            elevation="0"
            rounded
        >
          <slot name="icon"></slot>
          <slot v-if="!buttonWithoutText" name="item"></slot>
        </v-btn>
      </template>
      <v-card
          elevation="0"
          tile
          v-on:itemUpdated="listUpdated"
      >
        <v-toolbar
            :color="colorBg || 'purple darken-3'"
            :src="image || null"
            dark
            elevation="0"
            prominent
            class="bg-gray"
        >
          <v-toolbar-title>
            <slot name="item"></slot>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
              dark
              icon
              @click="dialog = false"
          >
            <v-icon dense>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-overlay
            absolute
            class="d-none"
            dark
        >
          <v-progress-circular
              indeterminate
              size="64"
          ></v-progress-circular>
        </v-overlay>

        <slot name="component"></slot>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "AddItemButtonWithPopup",
  props: {
    color: {},
    colorBg: {},
    image: {},
    dark: {},
    buttonWithoutText: {},
    open: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dialog: false
  }),
  created() {
    if (this.open){
      this.dialog = true
    }
  },
  methods: {
    listUpdated() {
      this.dialog = false
      this.$emit('listUpdated', 'ok')
    }
  }

}
</script>

<style>
  .bg-gray .v-toolbar__content {
    background-color: #00000094 !important;
  }
</style>
