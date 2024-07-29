<template>
  <div class="q-px-sm row">
    <div
      v-for="(_, key) in roomSupport"
      :key="key"
      @click="toggleCheckbox(key)"
      class="clickable"
    >
      <q-input
        :label="$t('text.' + key)"
        class="q-px-sm"
        readonly
        v-model="room"
      >
        <template #append>
          <q-checkbox v-model="roomSupport[key]" />
        </template>
      </q-input>
    </div>
    <q-input
      v-model="helpersValueFromMaterialSup"
      :label="$t('text.otherMaterials')"
      class="q-px-sm q-input-custom"
      @update:model-value="toggleInput(helpersValueFromMaterialSup)"
    />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["envity-sup"]);

const props = defineProps({
  materials: {
    type: Object as () => Record<string, boolean>,
    required: true,
  },
});

const room = ref();
const helpersValueFromMaterialSup = ref();
const roomSupport = ref();

const toggleCheckbox = (key: string | number) => {
  roomSupport.value[key] = !roomSupport.value[key];
  roomSupport.value["helpers"] = helpersValueFromMaterialSup.value;
  emits("envity-sup", roomSupport.value);
};

const toggleInput = (input: string) => {
  roomSupport.value["helpers"] = input;
  emits("envity-sup", roomSupport.value);
};

watchEffect(() => {
  if (props.materials) {
    roomSupport.value = {};
    for (const key in props.materials) {
      if (key !== "helpers") {
        roomSupport.value[key] = props.materials[key];
      }
    }
    helpersValueFromMaterialSup.value = props.materials["helpers"] || "";
  }
});
</script>
<style scoped>
.q-input-custom {
  width: 31rem;
}
</style>
