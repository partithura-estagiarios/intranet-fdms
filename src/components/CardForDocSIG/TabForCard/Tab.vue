<template>
  <q-tabs class="font-custom" v-model="tab">
    <q-btn
      v-for="(item, index) in tabItems"
      :key="index"
      no-caps
      flat
      size="lg"
      :name="item"
      :label="item"
      :class="tabClass(item)"
      @click="openCard(item)"
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
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useFiles } from "../../../stores/files";

const fileStorage = useFiles();
const { t } = useI18n();
const dialog = ref(false);
const title = ref("");
const option = ref("");
const tab = ref(""); // Define o valor inicial de tab como string vazia

const props = defineProps({
  tabItems: {
    type: Array as () => string[],
    required: true,
  },
});

const emits = defineEmits(["selectedFolderTree"]);

function openDialog(version: string) {
  dialog.value = true;
  if (version === "add") {
    option.value = "add";
    title.value = t("action.addFile");
  } else {
    option.value = "delete";
    title.value = t("action.deleteFile");
  }
}

function tabClass(itemName: string) {
  return {
    "text-green bg-white rounded-borders": itemName === tab.value,
  };
}

function openCard(item: string) {
  tab.value = item;
  fileStorage.toggleFolderTreeState(item);
}
</script>

<style scoped>
.font-custom {
  font-family: Fira Sans;
}

.rounded-borders {
  border-radius: 4px;
}
</style>
