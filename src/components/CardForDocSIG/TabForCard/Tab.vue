<template>
  <q-tabs v-model="tab" class="text-white bg-indigo-8">
    <q-tab
      no-caps
      v-for="(item, index) in tabItems"
      :key="index"
      :name="item.name"
      :label="$t(`cardDocSig.${item.name}`)"
      class="text-bold"
      :class="{ 'text-indigo-8 bg-white rounded-borders': tab === item.name }"
    />
    <q-btn icon="add_circle" @click="openDialog('add')" />
    <q-btn icon="delete" @click="openDialog('delete')" />

    <q-dialog v-model="dialog">
      <q-card class="my-card">
        <DialogHeader @close="(val) => (dialog = val)" :option="title" />
        <SelectFolder :version="option" />
      </q-card>
    </q-dialog>
  </q-tabs>
</template>

<script setup lang="ts">
import { tabItems } from "./lib";
const emits = defineEmits(["showCard"]);
const { t } = useI18n();
const tab = ref("processes");
const dialog = ref();
const title = ref();
const option = ref();
onMounted(() => {
  emits("showCard");
});

function openDialog(version: string) {
  dialog.value = true;
  if (version == "add") {
    option.value = "add";
    return (title.value = t("action.addFile"));
  }
  option.value = "delete";
  return (title.value = t("action.deleteFile"));
}
</script>
