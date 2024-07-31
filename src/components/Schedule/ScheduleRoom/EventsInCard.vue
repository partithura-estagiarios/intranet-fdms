<template>
  <q-list padding class="size-list scroll">
    <q-item v-ripple v-for="event in props.events" :key="event.id">
      <q-item-section class="text-no-wrap" @click="emits('selectEvent', event)">
        <div class="items-center text-h6 font-custom">
          <q-badge
            :style="`background-color:${event.location.color}`"
            class="q-mx-sm no-wrap"
            :color="event.colorRoom"
          />
          <span>{{ event.host.name }} - </span>
          <span>{{ event.rules }}</span>
          <MenuOptsRoom @exclude="excludeEvent(event.id)" :meet="event" />
        </div>
        <span class="text-bold font-custom q-px-lg">
          {{ getHours(event.initialTime) }} -
          {{ getHours(event.finalTime) }}
        </span>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { EventRoom } from "../../../entities/scheduleRoom";
import ExcludeMeet from "../../../graphql/scheduleRoom/ExcludeMeet.gql";
import { getHours } from "./lib";

const { t } = useI18n();
const emits = defineEmits(["reloadEvent", "close", "selectEvent"]);

const props = defineProps({
  events: {
    type: Array as () => EventRoom[],
    required: true,
  },
});

async function excludeEvent(eventId: string) {
  const { excludeMeet }: { excludeMeet: Boolean } = await runMutation(
    ExcludeMeet,
    { id: eventId },
  );
  if (excludeMeet) {
    emits("reloadEvent");
    return positiveNotify(t("text.meetCanceled"));
  }
  return negativeNotify(t("text.meetCanceledError"));
}
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
  color: rgb(31, 73, 125);
}
</style>
