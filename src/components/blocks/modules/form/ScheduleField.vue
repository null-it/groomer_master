<template>
  <v-sheet>
    <template v-if="!value" class="mx-auto text-center">
      <v-btn
          class="my-3"
          color="purple darken-3"
          dark
          @click="initSchedule"
      >
        {{ $t('app.fields.schedule.createDefault') }}
      </v-btn>

    </template>
    <template v-if="value">
      {{ $t('app.fields.schedule.title') }}
      <v-btn
          v-if="!value"
          @click="initSchedule"
      >

      </v-btn>
      <v-row v-for="(day, index) in schedule" :key="index" no-gutters>
        <v-col>
          <v-switch
              v-model="day.active"
              :label="$t('app.fields.schedule.week['+index+']')"
              class="v-text-field--reverse"
              dense

          ></v-switch>
        </v-col>
        <v-col>
          <v-select
              v-model="day.start"
              :disabled="!day.active"
              :items="availableTimeStart"
              class="px-5"
              prefix="C: "
          ></v-select>
        </v-col>
        <v-col>
          <v-select
              v-model="day.end"
              :disabled="!day.active"
              :items="availableTimeEnd(day.start)"
              class="px-5"
              prefix="До: "
          ></v-select>
        </v-col>
      </v-row>

    </template>
  </v-sheet>

</template>

<script>

export default {
  name: "ScheduleField",
  props: ['value'],
  model: {
    prop: 'value',
    event: 'input'
  },
  data: () => ({
    schedule: null,
  }),
  mounted() {
    if (this.value && this.isJsonValid) {
      this.schedule = JSON.parse(this.value)
    }
  },
  computed: {
    availableTimeStart() {
      return [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
      ]
    },
    isJsonValid() {
      try {
        JSON.parse(this.value);
      } catch (e) {
        return false;
      }
      return true;
    },
  },
  methods: {
    availableTimeEnd(time) {
      return this.availableTimeStart.filter(item => item > time)
    },

    initSchedule() {
      this.schedule = [
        {active: false, start: '00:00', end: '00:00'},
        {active: false, start: '10:00', end: '18:00'},
        {active: false, start: '10:00', end: '18:00'},
        {active: false, start: '10:00', end: '18:00'},
        {active: false, start: '10:00', end: '18:00'},
        {active: false, start: '10:00', end: '18:00'},
        {active: false, start: '00:00', end: '00:00'},
      ]
    },
  },
  watch: {
    schedule: {
      handler(val) {
        this.$emit('input', JSON.stringify(val))
      },
      deep: true
    },
    value(value) {
      if (!this.schedule && value) {
        this.schedule = JSON.parse(value)
      }
    }
  }
}
</script>

<style scoped>

</style>