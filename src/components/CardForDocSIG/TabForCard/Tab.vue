<template>
  <q-tabs v-model="tab" indicator-color="transparent">
    <q-tab
      no-caps
      v-for="(item, index) in tabItems"
      :key="index"
      :name="item.name"
      :label="$t(`cardDocSig.${item.name}`)"
      :class="tabClass(item.name)"
    />
    <div class="relative-position absolute-right">
      <q-btn icon="edit" flat>
        <q-menu anchor="bottom left">
          <q-list style="min-width: 100px">
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
const tabClass = computed(() => {
  return (itemName: string) => ({
    "text-indigo-8 bg-white rounded-borders": tab.value === itemName,
  });
});
</script>
