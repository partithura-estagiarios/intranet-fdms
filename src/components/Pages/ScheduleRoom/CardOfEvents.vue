<template>
  <div class="row justify-start">
    <q-list padding>
      <q-item clickable v-ripple v-for="event in daysEvents">
        <q-item-section>
          <div class="row items-center text-h6 font-custom">
            <q-badge :color="event.colorRoom" />
            <span class="q-px-sm">{{ event.userCreated.name }} - </span>
            <span class="q-px-none">{{ event.rules }}</span>
          </div>
          <span class="text-bold font-custom"
            >{{ getHours(event.initialTime) }} -
            {{ getHours(event.finalTime) }}</span
          >
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { getHours } from "./lib";
import { defineProps, PropType } from "vue";

const props = defineProps({
  daysEvents: {
    type: Array as PropType<Event[]>,
    required: true,
  },
});
</script>
<style scoped>
.font-custom {
  font-family: Fira Sans;
}
</style>
