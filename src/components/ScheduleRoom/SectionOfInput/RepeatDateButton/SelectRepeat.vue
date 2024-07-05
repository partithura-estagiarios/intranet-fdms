<template>
  <div class="size-input q-px-md">
    <q-select
      stack-label
      :label="$t('userScheduleRoom.repeat') + '?'"
      v-model="model"
      :options="buttonsRepeat.map((opt) => $t('userScheduleRoom.' + opt))"
      input-class="custom-select"
      :disable="!blockSelect"
    >
      <template #option="{ opt }">
        <q-item class="text-black" clickable>
          <q-item-section @click="changeModel(opt)" v-close-popup>
            <q-item-label>{{ opt }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>
<script setup lang="ts">
import { buttonsRepeat } from "./lib";
import { useEvents } from "../../../../stores/events";
const eventStorage = useEvents();
const emits = defineEmits(["optionRepeat"]);
const blockSelect = ref();
const model = ref();

const changeModel = (option: string) => {
  model.value = option;
  emits("optionRepeat", model.value);
};

watchEffect(() => {
  if (!eventStorage.getRepeatDate) {
    model.value = "Não";
    emits("optionRepeat", model.value);
    return (blockSelect.value = false);
  }
  model.value = "";
  blockSelect.value = true;
});
</script>
<style scoped>
.size-input {
  width: 15rem;
}
</style>
