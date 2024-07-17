<template>
  <div class="content row relative-position justify-bewtween">
    <div class="q-px-dm row">
      <InputNormal
        :inputs="formScheduleRoom.inputs"
        @envity-dates="(dates) => (formScheduleRoom.inputs = dates)"
        :options="formScheduleRoom.options"
      />
      <SelectRoom
        :options="formScheduleRoom.options"
        @envity-dates="(dates) => (formScheduleRoom.options.value = dates)"
      />
      <div class="col-12">
        <InputDateTime
          @envity-dates="
            (item1, item2) => (
              (formScheduleRoom.dateInfos.finalTime.value = item2),
              (formScheduleRoom.dateInfos.initialTime.value = item1)
            )
          "
        />
      </div>
    </div>
    <InputDescriptionEvent
      :inputDescription="formScheduleRoom.inputsLongs.description"
      @optionRepeat="handleOptionRepeat"
      @desc="(val) => (formScheduleRoom.inputsLongs.description = val)"
    />
    <div class="content row relative-position q-py-sm justify-between">
      <CheckBoxRoom
        :checks="formScheduleRoom.booleanInfos"
        @envity-dates="(items) => (formScheduleRoom.booleanInfos = items)"
      />
    </div>
    <div class="col-12">
      <q-input
        outlined
        dense
        v-model="formScheduleRoom.inputsLongs.supportMaterialExtras"
        :label="$t('text.otherMaterials')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inputsForScheduleRoom, resetObject } from "../addScheduleRoom/lib";
import { useEvents } from "../../../stores/events";
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
</style>
