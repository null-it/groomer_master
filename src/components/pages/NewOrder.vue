<template>
  <orders-create-form
      v-on:pageReload="listUpdated"
  ></orders-create-form>
</template>

<script>
import OrdersCreateForm from "@/components/blocks/orders/OrdersCreateForm";

export default {
  name: "NewOrder",
  components: {OrdersCreateForm},
  methods: {
    listUpdated(){
      this.$router.push({name: 'orders'})
    }
  }
}
</script>

<style scoped>

</style>
