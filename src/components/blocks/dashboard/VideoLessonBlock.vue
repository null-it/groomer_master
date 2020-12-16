<template>
  <section>
    <p>
      {{ $t('app.dashboard.blocks.lesson.description') }}
    </p>
    <youtube fitParent resize video-id="aqz-KE-bpK"></youtube>
  </section>
</template>

<script>
export default {
  name: "VideoLessonBlock",
  created() {
    this.$parent.$emit('loaderChange', false)
  }
}
</script>

<style scoped>

</style>