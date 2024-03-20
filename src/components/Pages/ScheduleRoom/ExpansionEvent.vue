<template>
  <q-expansion-item v-if="hasEventsForDate(props.data)">
    <template v-slot:header>
      <div
        v-for="event in getEventsByDate(props.data)"
        class="row items-center"
      >
        <q-badge rounded :color="event.colorRoom">
          <q-tooltip>
            {{ event.user_created.name }}
          </q-tooltip>
        </q-badge>
      </div>
    </template>
    <template v-for="event in getEventsByDate(props.data)">
      <div>
        <q-badge rounded :color="event.colorRoom" />
        {{ event.user_created.name }}
      </div>
      <div></div>
    </template>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { formatDate } from "./lib";

const props = defineProps({
  data: {
    type: String,
    default: "",
  },
  events: {
    type: Array,
    default: [],
  },
});

function hasEventsForDate(date) {
  return props.events.some((event) => formatDate(event.final_time) === date);
}

function getEventsByDate(date) {
  return props.events.filter((event) => formatDate(event.final_time) === date);
}
</script>
