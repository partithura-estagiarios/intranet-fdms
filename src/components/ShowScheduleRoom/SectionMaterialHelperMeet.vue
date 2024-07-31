<template>
  <q-card-section class="text-weight-bold color-custom text-center">
    <div class="bold">{{ $t("text.supportMaterial") }}</div>
  </q-card-section>
  <q-card-section class="row text-weight-bold color-custom">
    <div
      class="row text-weight-bold q-px-sm"
      v-for="(item, index) in roomSupport"
      v-show="item"
      :key="index"
    >
      <p>{{ $t(`text.${index}`) }}</p>
    </div>
    <p>{{ helpersValueFromMaterialSup }}</p>
  </q-card-section>
</template>

<script setup lang="ts">
const props = defineProps({
  eventShow: {
    type: Object,
    required: true,
  },
});
const helpersValueFromMaterialSup = ref();
const roomSupport = ref();
const room = ref();

watchEffect(() => {
  if (props.eventShow) {
    room.value = props.eventShow;
    roomSupport.value = {};
    for (const key in room.value.support) {
      if (key !== "helpers") {
        roomSupport.value[key] = room.value.support[key];
      }
    }
    helpersValueFromMaterialSup.value = room.value.support["helpers"];
  }
});
</script>
<style scoped>
.color-custom {
  color: rgb(31, 73, 125);
}
</style>
