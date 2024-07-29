<template>
  <q-toolbar class="row justify-center custom-toolbar">
    <q-item class="font-custom custom-margin">
      <q-item-section class="items-center">
        <q-btn
          no-caps
          color="green"
          :label="$t('text.schedulEvent')"
          class="text-body1 text-white"
          @click="$emit('openModalAdd')"
        />
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section class="items-center font-custom">
        <Month :select-date="props.date" />
        <NavigationScheduleRoom
          @today="$emit('today')"
          @prev="$emit('prev')"
          @next="$emit('next')"
        />
      </q-item-section>
    </q-item>
  </q-toolbar>
</template>

<script setup lang="ts">
import { useEvents } from "../../../stores/events";

const props = defineProps({
  date: {
    type: String,
    required: true,
  },
});

const eventStorage = useEvents();
const card = ref(false);

const openModalAddScheduleRoom = () => {};
</script>
<style scoped>
.custom-toolbar {
  margin-top: -8rem;
}
.custom-margin {
  margin-right: 15rem;
}
.font-custom {
  font-family: Fira Sans;
}
</style>
