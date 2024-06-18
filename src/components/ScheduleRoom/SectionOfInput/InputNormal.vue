<template>
  <div class="col-6 q-px-sl q-pr-md">
    <q-input
      :label="$t('userScheduleRoom.name')"
      class="border mb-4"
      v-model="formInputNormal.name.value"
      type="text"
    >
      <template #prepend>
        <q-icon
          :name="formInputNormal.name.icon"
          class="custom-color full-height q-px-md"
          color="white"
        />
      </template>
    </q-input>
    <q-input
      :label="$t('userScheduleRoom.email')"
      class="border"
      v-model="formInputNormal.email.value"
      type="email"
    >
      <template #prepend>
        <q-icon
          :name="formInputNormal.email.icon"
          class="custom-color full-height q-px-md"
          color="white"
        />
      </template>
    </q-input>
  </div>
  <div class="col-6">
    <q-input
      :label="$t('userScheduleRoom.ramal')"
      class="border mb-4"
      v-model="formInputNormal.ramal.value"
      type="number"
    >
      <template #prepend>
        <q-icon
          :name="formInputNormal.ramal.icon"
          class="custom-color full-height q-px-md"
          color="white"
        />
      </template>
    </q-input>
    <q-input
      :label="$t('userScheduleRoom.totalPeople')"
      class="border"
      v-model="formInputNormal.totalPeople.value"
      type="number"
    >
      <template #prepend>
        <q-icon
          :name="formInputNormal.totalPeople.icon"
          class="custom-color full-height q-px-md"
          color="white"
        />
      </template>
    </q-input>
  </div>
  <div class="col-6 q-pa-sl q-py-md q-pr-md">
    <q-input
      :label="$t('userScheduleRoom.userRegistration')"
      class="border"
      v-model="formInputNormal.userRegistration.value"
      type="number"
    >
      <template #prepend>
        <q-icon
          :name="formInputNormal.userRegistration.icon"
          class="custom-color full-height q-px-md"
          color="white"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
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
  border: 0.1rem rgb(31, 73, 125) solid;
  border-radius: 0.2rem;
}
.custom-color {
  background-color: rgb(31, 73, 125);
}
</style>
