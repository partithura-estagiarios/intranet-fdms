<template>
  <q-dialog v-model="card" :persistent="true">
    <q-card class="my-card">
      <DialogHeader option="Eventos" @close="closeCard" />
      <TitleCardEventsMonth
        :monthName="props.monthName"
        class="justify-center"
      />
      <AllEventsInMonth :events="eventsCard" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { EventRoom } from "../../../../entities/scheduleRoom";
import { Month } from "../../../../stores/months";

const emits = defineEmits(["close"]);
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  monthName: {
    type: String,
    required: true,
  },
  events: {
    type: Array as () => EventRoom[],
  },
});
const card = ref();
const eventsCard = ref(props.events || []);
watchEffect(() => {
  card.value = props.open;
});
function closeCard() {
  card.value = true;
  emits("close");
}
</script>
