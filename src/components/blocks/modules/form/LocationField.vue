<template>
  <div>
    <v-sheet height="30vh" color="indigo" class="mb-3" style="position: relative;">
      <v-icon color="purple darken-3" class="map-pointer">
        mdi-map-marker
      </v-icon>
      <div class="purple fill-height map-container" ref="map"></div>
    </v-sheet>
    <v-btn color="purple darken-3" class="mb-3" dark @click.stop="findMe">
      {{ this.$i18n.t("app.base.find_me") }}
    </v-btn>
  </div>

</template>

<script>
import {Loader} from 'google-maps'

export default {
  name: "LocationField",
  props: ['field', 'value'],
  model:{
    prop:'value',
    event:'input'
  },
  data: () => ({
    coords: null,
    addressObject: null,
    google: null,
    map: null,
    apiKey: "AIzaSyD22xkJbXLua3mDlRBzG4QN-JtaPB8HyxQ",
    timeout: null,
    libraries: ['places'],
    mapOptions: {
      disableDefaultUI: false,
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 15
    }
  }),
  created() {
    const loader = new Loader(this.apiKey, {
      libraries: this.libraries,
      language: this.$i18n.locale,
    })
    loader.load().then(this.initMap)
  },

  computed:{
    exportModel(){
      const exportModel = this.addressObject
      return exportModel
    }
  },

  watch:{
    exportModel(newVal){
      this.$emit('input', newVal)
    },
    'field.center': function () {
      if (this.map)
      this.map.setCenter(
          {
            lat: this.field.center.lat,
            lng: this.field.center.lng,
          }
      );
    }
  },
  methods: {
    findMe(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.map.setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }, function () {

        });
      }
    },
    initMap(google) {
      this.google = google
      const mapContainer = this.$refs.map

      if(this.field.center){
        this.mapOptions.center = this.field.center
      }
      this.map = new this.google.maps.Map(
          mapContainer, this.mapOptions
      )

      const geocoder = new google.maps.Geocoder();

      this.map.addListener('center_changed', ()=>{
        clearTimeout(this.timeout)
        this.timeout = setTimeout(()=>{
          this.timeout = null
          const newCenter = this.map.getCenter()

          const latlng = {
            lat: newCenter.lat(),
            lng: newCenter.lng(),
          };

          this.coords = latlng
          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                this.addressObject = results[0]
              }
            }
          });

        }, 1000)

      })
    }
  }
}
</script>

<style scoped>
.map-pointer{
  position: absolute;
  justify-self: center;
  align-self: center;
  left: calc(50% - 10px);
  top: calc(50% - 20px);
  margin: auto;
  width: 20px;
  height: 20px;
  z-index: 2;
}
.map-container{
  width: 100%;

}
</style>
