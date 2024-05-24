<template>
  <div class="row">
    <TitleOfCardEvents
      class="q-py-md q-px-xl no-wrap"
      :headerEvents="props.daysEvents[0]"
    />
    <q-list padding class="size-list scroll">
      <q-item clickable v-ripple v-for="event in daysEvents">
        <q-item-section>
          <div class="row items-center text-h6 font-custom">
            <q-badge color="red" />
            <span>{{ event.userCreated.name }} - </span>
            <span>{{ event.rules }}</span>
          </div>
          <span class="text-bold font-custom"
            >{{ getHours(new Date(event.initialTime)) }} -
            {{ getHours(new Date(event.finalTime)) }}</span
          >
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { getHours } from "./lib";
import { EventRoom } from "../../../entities/scheduleRoom";
import { defineProps, PropType } from "vue";

const props = defineProps({
  daysEvents: {
    type: Array as PropType<EventRoom[]>,
    required: true,
  },
});
</script>
<style scoped>
.font-custom {
  font-family: Fira Sans;
}
.size-list {
  max-height: 40rem;
  scrollbar-gutter: stable both-edges;
  position: relative;
  padding-right: 20.2rem;
}
</style>
