<template>
  <div class="row">
    <InputNormal
      :inputs="formScheduleRoom.inputs"
      @envity-dates="(dates) => (formScheduleRoom.inputs = dates)"
      :options="formScheduleRoom.options"
      @envitySelect="(val) => (formScheduleRoom.options.value = val)"
    />
  </div>

  <InputDateTime
    @envity-dates="
      (item1, item2) => (
        (formScheduleRoom.dateInfos.finalTime.value = item2),
        (formScheduleRoom.dateInfos.initialTime.value = item1)
      )
    "
  />
  <q-input
    outlined
    v-model="formScheduleRoom.inputsLongs.description"
    :label="$t('text.descriptionOfEvent')"
    class="q-py-sm size"
    dense
    type="text"
    :rules="[(val) => validateNotEmpty(val)]"
    hide-bottom-space
  >
  </q-input>
  <div class="row">
    <CheckBoxRoom
      :checks="formScheduleRoom.booleanInfos"
      @envity-dates="(items) => (formScheduleRoom.booleanInfos = items)"
    />
  </div>
  <div class="size">
    <q-input
      outlined
      dense
      v-model="formScheduleRoom.inputsLongs.supportMaterialExtras"
      :label="$t('text.otherMaterials')"
    />
  </div>
</template>

<script setup lang="ts">
import { inputsForScheduleRoom, resetObject } from "../addScheduleRoom/lib";
import { useEvents } from "../../../stores/events";
import { useFieldValidation } from "../../../composables/rules";

const { validateNotEmpty } = useFieldValidation();
const eventStorage = useEvents();
const formScheduleRoom = reactive(inputsForScheduleRoom);
const emits = defineEmits(["envityRoom", "optionRepeat"]);
const text = ref();
const date = ref();

watchEffect(() => {
  emits("envityRoom", formScheduleRoom);
});

onUnmounted(() => {
  resetObject(formScheduleRoom);
  eventStorage.resetDateSelected;
});

onMounted(() => {
  resetObject(formScheduleRoom);
  eventStorage.resetDateSelected;
});
function handleOptionRepeat(val: string, val2: Date) {
  text.value = val;
  date.value = val2;
  emits("optionRepeat", text.value, date.value);
}
</script>
<style scoped>
.border-color {
  color: rgb(31, 73, 125);
}
.pad-date-time {
  top: -1vh;
  position: relative;
}
.custom-color {
  background-color: rgb(31, 73, 125);
}
.font-custom {
  font-family: Fira Sans;
}
.size {
  right: 0.7rem;
  width: 32rem;
}
</style>
