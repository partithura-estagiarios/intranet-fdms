<template>
  <q-select v-model="model" :options="rooms" :label="$t('text.selectRoom')">
    <template #option="{ opt }">
      <q-item class="text-black" clickable>
        <q-item-section @click="model = opt" v-close-popup>
          <q-item-label>{{ opt }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
const rooms = ["SALA A", "SALA B", "SALA C", "SALA DE REUNIÃO"];
const emits = defineEmits(["envity-new-room"]);
const props = defineProps({
  option: {
    type: String,
    required: true,
  },
});
const model = ref(props.option);
watchEffect(() => {
  emits("envity-new-room", model.value);
});
</script>
