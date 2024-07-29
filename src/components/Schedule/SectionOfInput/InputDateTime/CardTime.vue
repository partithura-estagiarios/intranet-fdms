<template>
  <q-card>
    <q-time
      v-model="time"
      format24h
      class="text-black"
      color="grey"
      mask="HH:mm"
      @update:model-value="updateTime"
    />
  </q-card>
</template>

<script setup lang="ts">
const time = ref("");
const emits = defineEmits(["timeSelected"]);

const updateTime = () => {
  emits("timeSelected", time.value);
};
</script>
