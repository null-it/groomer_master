<template>
  <component-box>
    <template v-slot:title>
      Календарь
    </template>
    <template v-slot:default>
      <calendar-view></calendar-view>
    </template>
  </component-box>
</template>

<script>


import ComponentBox from "@/components/blocks/modules/ui/ComponentBox";
import CalendarView from "@/components/blocks/calendar/CalendarView";

export default {
  name: "Calendar",
  components: {CalendarView, ComponentBox},
}
</script>

<style scoped>

</style>