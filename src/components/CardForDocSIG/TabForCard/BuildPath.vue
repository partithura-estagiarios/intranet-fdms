<template>
  <q-card-section class="q-pt-none">
    <q-select
      stack-label
      :label="$t('folders.folderGrandParent')"
      v-model="folderGrandParentSelect"
      :options="fileStorage.optionsGrandParent"
      @update:model-value="handleGrandParentSelectChange"
    >
      <template v-if="folderGrandParentSelect" v-slot:append>
        <q-icon
          name="cancel"
          @click.stop.prevent="zerateGrandParent"
          class="cursor-pointer"
        />
      </template>
    </q-select>

    <q-select
      v-if="folderGrandParentSelect"
      stack-label
      :label="$t('folders.folderParent')"
      v-model="folderParentSelect"
      :options="foldersParents"
      @update:model-value="handleParentSelectChange"
    >
      <template v-if="folderParentSelect" v-slot:append>
        <q-icon
          name="cancel"
          @click.stop.prevent="zerateParent"
          class="cursor-pointer"
        />
      </template>
    </q-select>

    <AddFolder v-if="showAddFolder" :path="path.join('/')" />
    <q-select
      v-if="showSelectChild"
      stack-label
      :label="$t('folders.folderChild')"
      :options="foldersChild"
      v-model="folderChildtSelect"
      @update:model-value="handleChildSelectChange"
    >
      <template v-if="folderChildtSelect" v-slot:append>
        <q-icon
          name="cancel"
          @click.stop.prevent="zerateChild"
          class="cursor-pointer"
        />
      </template>
    </q-select>
    <AddFile v-if="showAddFile" :path="path.join('/')" />
    <div v-if="showDelete">
      <q-select
        stack-label
        :label="$t('folders.selectFile')"
        :options="files"
        v-model="fileSelect"
        @update:model-value="handleFileSelectChange"
      >
        <template v-if="fileSelect" v-slot:append>
          <q-icon
            name="cancel"
            @click.stop.prevent="zerateFile"
            class="cursor-pointer"
          />
        </template>
      </q-select>
      <DeleteItem :path="path.join('/')" />
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
import {
  eliminateRepeats,
  positionOfChild,
  positionOfFile,
  positionOfGrandParent,
  positionOfParent,
  changeOptions,
  changeFiles,
  isFolder,
  isFile,
  isDeletion,
} from "./lib";

const fileStorage = useFiles();

const props = defineProps({
  activeDialog: {
    type: Boolean,
    required: true,
  },
  option: {
    type: String,
    required: true,
  },
});

const path = ref<string[]>([]);
const folderGrandParentSelect = ref();
const foldersParents = ref();
const folderParentSelect = ref();
const foldersChild = ref();
const folderChildtSelect = ref();
const fileSelect = ref();
const files = ref();

const showAddFolder = computed(() => {
  return props.option === isFolder;
});
const showSelectChild = computed(() => {
  return (
    props.option === isFile ||
    (props.option === isDeletion && folderGrandParentSelect.value)
  );
});
const showAddFile = computed(() => {
  return props.option === isFile && folderChildtSelect.value;
});
const showDelete = computed(() => {
  return props.option === isDeletion;
});

function handleGrandParentSelectChange(newValue: string) {
  folderGrandParentSelect.value = newValue;
  folderParentSelect.value = null;
  folderChildtSelect.value = null;
  fileSelect.value = null;
  foldersParents.value = changeOptions(
    fileStorage.optionsParent,
    folderGrandParentSelect.value,
  );
  buildingPath(newValue, positionOfGrandParent);
}

function handleParentSelectChange(newValue: string) {
  folderParentSelect.value = newValue;
  folderChildtSelect.value = null;
  fileSelect.value = null;
  foldersChild.value = changeOptions(
    fileStorage.optionsChild,
    folderParentSelect.value,
  );
  buildingPath(newValue, positionOfParent);
}

function handleChildSelectChange(newValue: string) {
  folderChildtSelect.value = newValue;
  fileSelect.value = null;
  files.value = changeFiles(fileStorage.files, folderChildtSelect.value);
  buildingPath(newValue, positionOfChild);
}

function handleFileSelectChange(newValue: string) {
  fileSelect.value = newValue;
  buildingPath(newValue, positionOfFile);
}

function buildingPath(folderName: string, index: number) {
  path.value.splice(index, eliminateRepeats, folderName);
}

function zerateGrandParent() {
  folderGrandParentSelect.value = null;
  folderParentSelect.value = null;
  folderChildtSelect.value = null;
  fileSelect.value = null;
  buildingPath("", positionOfGrandParent);
  buildingPath("", positionOfParent);
  buildingPath("", positionOfChild);
  buildingPath("", positionOfFile);
  foldersParents.value = [];
  foldersChild.value = [];
  files.value = [];
}

function zerateParent() {
  folderParentSelect.value = null;
  folderChildtSelect.value = null;
  fileSelect.value = null;
  buildingPath("", positionOfParent);
  buildingPath("", positionOfChild);
  buildingPath("", positionOfFile);
  foldersChild.value = [];
  files.value = [];
}

function zerateChild() {
  folderChildtSelect.value = null;
  fileSelect.value = null;
  buildingPath("", positionOfChild);
  buildingPath("", positionOfFile);
  files.value = [];
}

function zerateFile() {
  fileSelect.value = null;
  buildingPath("", positionOfFile);
}
</script>
