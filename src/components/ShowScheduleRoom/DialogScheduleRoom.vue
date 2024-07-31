<template>
  <SectionHoursOfMeet :room="room" />
  <q-separator />
  <SectionHostNameMeet :room="room" />
  <q-separator />
  <SectionHostMeet :room="room" />
  <q-separator />
  <SectionMaterialHelperMeet :eventShow="room" />
</template>

<script setup lang="ts">
const props = defineProps({
  eventShow: {
    type: Object,
    required: true,
  },
});

const room = ref(props.eventShow);
</script>
<style scoped>
.color-custom {
  color: rgb(31, 73, 125);
}
</style>
