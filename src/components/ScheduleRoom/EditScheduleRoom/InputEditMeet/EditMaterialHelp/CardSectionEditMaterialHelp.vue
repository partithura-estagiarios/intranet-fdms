<template>
  <div class="q-px-sm">
    <q-checkbox
      v-for="(material, key) in support"
      :key="key"
      :label="$t('text.' + key)"
      v-model="support[key]"
      @click="toggleCheckbox(material)"
      class="text-black"
    />
  </div>
  <div>
    <q-input
      v-model="model"
      :label="$t('text.otherMaterials')"
      class="q-px-md"
    />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["envity-sup"]);
const props = defineProps({
  materials: {
    type: Object,
    required: true,
  },
});
const toggleCheckbox = (item: any) => {
  item.value = !item.value;
};
const model = ref();
const support = ref();
watchEffect(() => {
  support.value = {
    coffee: props.materials.coffee,
    computer: props.materials.computer,
    equipamentSong: props.materials.equipamentSong,
    flipSharp: props.materials.flipSharp,
    projector: props.materials.projector,
    water: props.materials.water,
  };
  model.value = props.materials.helpers;
});
watchEffect(() => {
  const aux = {
    ...props.materials,
    coffee: support.value.coffee,
    computer: support.value.computer,
    equipamentSong: support.value.equipamentSong,
    flipSharp: support.value.flipSharp,
    projector: support.value.projector,
    water: support.value.water,
    helpers: model.value,
  };
  emits("envity-sup", aux);
});
</script>
