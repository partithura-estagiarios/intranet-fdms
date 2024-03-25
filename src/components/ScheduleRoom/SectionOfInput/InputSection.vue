<template>
  <div class="content row relative-position justify-bewtween">
    <InputNormal
      :inputs="formScheduleRoom.inputs"
      @envity-dates="(dates) => (formScheduleRoom.inputs = dates)"
    />
    <SelectRoom
      :options="formScheduleRoom.options"
      @envity-dates="(dates) => (formScheduleRoom.options.value = dates)"
    />
    <InputDateTime
      @envity-dates="
        (item1, item2) => (
          (formScheduleRoom.dateInfos.finalTime.value = item2),
          (formScheduleRoom.dateInfos.initialTime.value = item1)
        )
      "
      :selectDate="props.selectDate"
    />
    <div class="col-12 q-pa-sm">
      <q-input
        bg-color="white "
        class="border q-px-md"
        v-model="formScheduleRoom.inputsLongs.description"
        :label="$t('text.descriptionOfEvent')"
      />
    </div>
    <div
      class="bg-indigo-8 text-white q-pa-md text-h6 q-px-xl relative-position"
    >
      {{ $t("text.supportMaterial") }}
    </div>
    <div class="content row relative-position q-px-sl justify-between">
      <CheckBoxRoom
        :checks="formScheduleRoom.booleanInfos"
        @envity-dates="(items) => (formScheduleRoom.booleanInfos = items)"
      />
    </div>
    <div class="col-12">
      <q-input
        bg-color="white "
        class="border q-px-md"
        v-model="formScheduleRoom.inputsLongs.supportMaterialExtras"
        :label="$t('text.otherMaterials')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inputsForScheduleRoom, resetObject } from "../addScheduleRoom/lib";
const formScheduleRoom = reactive(inputsForScheduleRoom);
const props = defineProps({
  selectDate: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["envityRoom"]);

watchEffect(() => {
  emits("envityRoom", formScheduleRoom);
});

onUnmounted(() => {
  resetObject(formScheduleRoom);
});
</script>
<style scoped>
.border {
  border: 1px rgb(29, 29, 167) solid;
  border-radius: 2px;
}
</style>
