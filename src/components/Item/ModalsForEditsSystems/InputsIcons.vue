<template>
  <q-input
    v-model="mod"
    stack-label
    readonly
    :label="$t('text.icon')"
    class="q-px-md"
  >
    <template #append>
      <q-icon name="search" />
      <ListIcons @receveid="handleIcon" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
const mod = ref();
const emits = defineEmits(["receveid"]);
const handleIcon = (option: string) => {
  mod.value = option;
  emits("receveid", option);
};
</script>
