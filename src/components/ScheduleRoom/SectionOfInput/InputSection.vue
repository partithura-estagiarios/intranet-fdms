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
    />
    <div class="col-12 q-px-sm pt-4 pb-4">
      <q-input
        bg-color="white "
        class="border q-px-md"
        v-model="formScheduleRoom.inputsLongs.description"
        label="Descrição do Evento"
      />
    </div>
    <div class="bg-indigo-8 text-white q-px-xl q-py-none">
      Materiais de Apoio
    </div>
    <div class="content row relative-position q-px-sl justify-between">
      <CheckBoxRoom
        :checks="formScheduleRoom.booleanInfos"
        @envity-dates="(items) => (formScheduleRoom.booleanInfos = items)"
      />
    </div>
    <div class="col-12 q-px-sm pt-4 pb-4">
      <q-input
        bg-color="white "
        class="border q-px-md"
        v-model="formScheduleRoom.inputsLongs.supportMaterialExtras"
        label="Outras Ex: Canetas, Folhas A4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inputsForScheduleRoom } from "../addScheduleRoom/lib";
const formScheduleRoom = reactive(inputsForScheduleRoom);
const emits = defineEmits(["envityRoom"]);
watchEffect(() => {
  emits("envityRoom", formScheduleRoom);
});
</script>
<style scoped>
.border {
  border: 1px rgb(29, 29, 167) solid;
  border-radius: 2px;
}
</style>
