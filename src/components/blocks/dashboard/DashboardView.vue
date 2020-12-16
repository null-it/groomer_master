<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <component-box class-name="ma-0">
          <calendar-view></calendar-view>
        </component-box>
      </v-col>
      <v-col cols="12">
        <component-box class-name="ma-0">
          <template v-slot:title>
            {{ $t('app.dashboard.blocks.orders.title') }}
          </template>
          <template v-slot:default>
            <orders-list-view></orders-list-view>
          </template>
        </component-box>
      </v-col>

      <v-col>
        <component-box class-name="ma-0 mt-5" :default-state="false">
          <template v-slot:title>
            {{ $t('app.dashboard.blocks.lesson.title') }}
          </template>
          <template v-slot:actions="{state, stateToggle}">
            <v-icon @click="stateToggle">{{ state ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </template>
          <video-lesson-block></video-lesson-block>
        </component-box>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ComponentBox from "@/components/blocks/modules/ui/ComponentBox";
import OrdersListView from "@/components/blocks/orders/OrdersListView";
import CalendarView from "@/components/blocks/calendar/CalendarView";
import VideoLessonBlock from "@/components/blocks/dashboard/VideoLessonBlock";


export default {
  name: "DashboardView",
  components: {
    VideoLessonBlock,
    CalendarView,
    OrdersListView,
    ComponentBox,
  }
}
</script>

<style scoped>

</style>
