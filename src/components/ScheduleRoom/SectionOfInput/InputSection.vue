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
    <div class="row q-py-sm">
      <q-input
        outlined
        v-model="formScheduleRoom.inputsLongs.description"
        :label="$t('text.descriptionOfEvent')"
        type="text"
      />
      <SelectRepeat @option-repeat="(val) => $emit('optionRepeat', val)" />
    </div>

    <div class="content row relative-position q-py-sm justify-between">
      <CheckBoxRoom
        :checks="formScheduleRoom.booleanInfos"
        @envity-dates="(items) => (formScheduleRoom.booleanInfos = items)"
      />
    </div>
    <div class="col-12">
      <q-input
        outlined
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
