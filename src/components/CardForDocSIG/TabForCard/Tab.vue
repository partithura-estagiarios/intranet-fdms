<template>
  <q-tabs v-model="tab" indicator-color="transparent">
    <q-tab
      no-caps
      v-for="item in tabItems"
      :name="item.name"
      :label="item.name"
      :class="tabClass(item.name)"
      @click="openCard(item.name)"
    />
    <div class="relative-position absolute-right">
      <q-btn icon="edit" flat>
        <q-menu anchor="bottom left" self="top start">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section icon="add_circle" @click="openDialog('add')">
                {{ $t("action.addFile") }}
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section icon="delete" @click="openDialog('delete')">
                {{ $t("action.deleteFile") }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <q-dialog v-model="dialog">
      <q-card>
        <DialogHeader @close="(val) => (dialog = val)" :option="title" />
        <SelectFolder :version="option" />
      </q-card>
    </q-dialog>
  </q-tabs>
</template>

<script setup lang="ts">
import { FolderTree } from "../../../entities/files";
const emits = defineEmits(["showCard"]);
const { t } = useI18n();
const tab = ref("processes");
const dialog = ref();
const title = ref();
const option = ref();
const props = defineProps({
  tabItems: {
    type: Array<FolderTree>,
    required: true,
  },
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
const tabClass = computed(() => {
  return (itemName: string) => ({
    "text-indigo-8 bg-white rounded-borders": tab.value === itemName,
  });
});
function openCard(item: string) {
  emits("showCard", item);
}
</script>
