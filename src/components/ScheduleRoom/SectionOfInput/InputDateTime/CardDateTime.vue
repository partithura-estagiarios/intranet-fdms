<template>
  <q-dialog v-model="props.showCard" class="">
    <q-card class="my-card row q-px-">
      <q-card-section class="row no-wrap no-scroll">
        <q-date
          v-model="dateTime"
          mask="YYYY-MM-DD HH:mm"
          color="indigo-8"
          class="rounded-borders col-6"
        />
        <div class="col-1"></div>
        <q-time
          v-model="dateTime"
          mask="YYYY-MM-DD HH:mm"
          format24h
          color="indigo-8"
          class="rounded-borders col-5"
        />
      </q-card-section>
      <q-card-section>
        <q-btn
          label="Confirm"
          color="green"
          @click="emits('close', false, dateTime)"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watchEffect } from "vue";
import { verifyReceivedDate } from "../../addScheduleRoom/lib";

const emits = defineEmits(["close"]);

const props = defineProps({
  showCard: { type: Boolean, required: true },
  finalTime: {
    type: String,
    default: "",
  },
});

const dateTime = ref();

watchEffect(() => {
  if (verifyReceivedDate(props.finalTime)) {
    dateTime.value = verifyReceivedDate(props.finalTime);
  }
});
</script>
