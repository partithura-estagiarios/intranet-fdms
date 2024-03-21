<template>
  <div v-for="(item, index) in formInputNormal" class="q-pa-sm col-6">
    <q-input
      :label="index"
      bg-color="white "
      class="border"
      :type="verifyTypeOfInput(item.value)"
      v-model="item.value"
    >
      <template #prepend>
        <q-icon
          :name="item.icon"
          class="bg-indigo-8 full-height q-px-md"
          color="white"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { verifyTypeOfInput } from "../addScheduleRoom/lib";
const emits = defineEmits(["envityDates"]);
const props = defineProps({
  inputs: {
    type: Object,
    default: {},
  },
});

const formInputNormal = reactive(props.inputs);
watchEffect(() => {
  emits("envityDates", formInputNormal);
});
</script>
<style scoped>
.border {
  border: 1px rgb(29, 29, 167) solid;
  border-radius: 2px;
}
</style>
