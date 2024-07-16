<template>
  <div class="size">
    <q-select
      outlined
      v-model="model"
      :label="$t('userScheduleRoom.repeat')"
      class="size q-py-md text-black"
      :options="buttonsRepeat.map((opt) => $t('userScheduleRoom.' + opt))"
      dense
      :disable="!blockSelect"
    >
      <template #option="{ opt }">
        <q-item class="text-black" clickable @click="changeModel(opt)">
          <q-item-section v-close-popup>
            <q-item-label>{{ opt }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
      <template #prepend>
        <q-icon
          class="custom-color full-height q-px-md"
          color="white"
          name="schedule"
        />
      </template>
    </q-select>
    <DateLimit
      class="q-px-sm"
      @envityDateLimit="(val) => (date = val)"
      v-if="model != 'Não'"
    />
  </div>
</template>

<script setup lang="ts">
import { useEvents } from "../../../../stores/events";

const emits = defineEmits(["optionRepeat"]);

const eventStorage = useEvents();
const model = ref();
const date = ref();
const buttonsRepeat = ["daily", "weekly", "no"];
const blockSelect = ref();

watchEffect(() => {
  if (!eventStorage.getRepeatDate) {
    model.value = "Não";
    emits("optionRepeat", model.value);
    return (blockSelect.value = false);
  }
  model.value = "";
  blockSelect.value = true;
});

const changeModel = (option: string) => {
  model.value = option;
  console.log(model.value, date.value);
};
watchEffect(() => {
  emits("optionRepeat", model.value, date.value);
});
</script>

<style scoped>
.custom-color {
  background-color: rgb(31, 73, 125);
  right: 0.7rem;
  width: 1.4rem;
}
.size {
  width: 16.9rem;
  padding-left: 0.5rem;
}
</style>
