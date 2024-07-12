<template>
  <q-inner-loading
    :showing="visible"
    :label="$t('text.pleaseWait')"
    label-class="text-green"
    color="indigo"
    label-style="font-size: 1.1em"
    class="color-loading"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
.color-loading {
  font-family: Fira Sans;
}
</style>
