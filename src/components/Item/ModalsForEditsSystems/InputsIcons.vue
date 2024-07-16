<template>
  <q-input
    v-model="none"
    stack-label
    readonly
    :label="$t('text.icon')"
    class="q-px-md"
    @click="enable = !enable"
  >
    <template #append>
      <q-icon :name="mod" class="color-custom" @click="enable = !enable" />
      <ListIcons @auto-close="handleIcon" :enable-picker="enable" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
const mod = ref("search");
const emits = defineEmits(["receveid"]);
const none = ref();
const enable = ref(false);
const handleIcon = (option: string) => {
  enable.value = !enable;
  mod.value = option;
  emits("receveid", option);
};
</script>

<style scoped>
.color-custom {
  color: rgb(31, 73, 125);
}
</style>
