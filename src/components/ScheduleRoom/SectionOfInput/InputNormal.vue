<template>
  <div class="row">
    <div class="col-6 q-px-sl q-pr-md">
      <q-input
        dense
        :label="$t('userScheduleRoom.name')"
        class="border mb-4"
        v-model="formInputNormal.name.value"
        type="text"
        :rules="[(val) => validateNotEmpty(val)]"
        hide-bottom-space
      >
        <template #prepend>
          <q-icon
            :name="formInputNormal.name.icon"
            class="custom-color full-height q-px-md"
            color="white"
          />
        </template>
      </q-input>
    </div>
    <div class="col-6 q-px-sl q-pr-md">
      <q-input
        dense
        :label="$t('userScheduleRoom.email')"
        class="border mb-4"
        v-model="formInputNormal.email.value"
        type="text"
        :rules="[(val) => validateNotEmpty(val)]"
        hide-bottom-space
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
    <div class="col-6 q-px-sl q-pr-md">
      <q-input
        dense
        :label="$t('userScheduleRoom.ramal')"
        class="border mb-4"
        v-model="formInputNormal.ramal.value"
        type="number"
        :rules="[(val) => validateNotEmpty(val)]"
        hide-bottom-space
      >
        <template #prepend>
          <q-icon
            :name="formInputNormal.ramal.icon"
            class="custom-color full-height q-px-md"
            color="white"
          />
        </template>
      </q-input>
    </div>
    <div class="col-6 q-px-sl q-pr-md">
      <q-input
        dense
        :label="$t('userScheduleRoom.totalPeople')"
        class="border mb-4"
        v-model="formInputNormal.totalPeople.value"
        type="number"
        :rules="[(val) => validateNotEmpty(val)]"
        hide-bottom-space
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
    <div class="col-6 q-px-sl q-pr-md">
      <q-input
        dense
        :label="$t('userScheduleRoom.userRegistration')"
        class="border mb-4"
        v-model="formInputNormal.userRegistration.value"
        type="number"
        :rules="[(val) => validateNotEmpty(val)]"
        hide-bottom-space
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
    <div class="col-6 q-pr-md">
      <SelectRoom
        :options="props.options"
        @envity-dates="(item) => emits('envitySelect', item)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { validateNotEmpty } = useFieldValidation();
const emits = defineEmits(["envityDates", "envitySelect"]);
const props = defineProps({
  inputs: {
    type: Object,
    default: {},
  },
  options: {
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
