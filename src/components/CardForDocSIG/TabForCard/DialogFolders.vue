<template>
  <div class="q-pa-md bg-white">
    <q-list dense class="rounded-borders" v-for="item in props.foldersList">
      <q-item clickable flat @click="emits('selectFolder', item)">
        {{ item }}
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  foldersList: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(["selectFolder"]);
</script>
