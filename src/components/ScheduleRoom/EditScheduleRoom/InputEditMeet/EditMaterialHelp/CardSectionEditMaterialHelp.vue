<template>
  <div class="q-px-sm row">
    <div
      v-for="key in Object.keys(materialsState)"
      :key="key"
      @click="toggleCheckbox(key)"
    >
      <q-input
        :label="$t('text.' + key)"
        class="q-px-sm"
        readonly
        v-model="inputValue"
      >
        <template #append>
          <q-checkbox v-model="materialsState[key]" />
        </template>
      </q-input>
    </div>
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
delete props.materials.helpers;

const materialsState: Record<string, boolean> = reactive({});
for (const key in props.materials) {
  materialsState[key] =
    typeof props.materials[key] === "boolean" ? props.materials[key] : true;
}

const inputValue = ref("");

const toggleCheckbox = (key: string) => {
  materialsState[key] = !materialsState[key];
  emits("envity-sup", materialsState);
};
</script>
