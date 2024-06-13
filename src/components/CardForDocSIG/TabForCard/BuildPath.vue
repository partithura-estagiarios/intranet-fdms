<template>
  <q-card-section class="q-pt-none">
    <SelectPath
      :folders="fileStorage.optionsGrandParent"
      @handleSelect="
        (folderList: string) => handleGrandParentSelectChange(folderList)
      "
      @cleanFolders="cleanAllFolders()"
      :folderSelect="folderGrandParentSelect"
      title="folders.folderGrandParent"
    />
    <SelectPath
      v-if="folderGrandParentSelect"
      :folderSelect="folderParentSelect"
      :folders="foldersParents"
      @handleSelect="
        (folderList: string) => handleParentSelectChange(folderList)
      "
      @cleanFolders="cleanFoldersAndSubFolders()"
      title="folders.folderParent"
    />
    <AddFolder v-if="showAddFolder" :path="path.join('/')" />
    <SelectPath
      v-if="showSelectChild"
      :folderSelect="folderChildSelect"
      :folders="foldersChild"
      @handleSelect="
        (folderList: string) => handleChildSelectChange(folderList)
      "
      @cleanFolders="cleanSubFolders()"
      title="folders.folderChild"
    />
    <AddFile v-if="showAddFile" :path="path.join('/')" />
    <div v-if="showDelete">
      <SelectPath
        v-if="showExcludeFile"
        :folderSelect="fileSelect"
        :folders="files"
        @handleSelect="
          (folderList: string) => handleFileSelectChange(folderList)
        "
        @cleanFolders="cleanFiles()"
        title="folders.selectFile"
      />
      <DeleteItem :path="path.join('/')" />
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
import {
  eliminateRepeats,
  indexOfChild,
  indexOfFile,
  indexOfGrandParent,
  indexOfParent,
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
const folderChildSelect = ref();
const fileSelect = ref();
const files = ref();

const showAddFolder = computed(() => {
  return props.option === isFolder;
});
const showExcludeFile = computed(() => {
  return folderChildSelect.value;
});
const showSelectChild = computed(() => {
  return (
    folderGrandParentSelect.value &&
    folderParentSelect.value &&
    props.option !== isFolder
  );
});
const showAddFile = computed(() => {
  return props.option === isFile && folderChildSelect.value;
});
const showDelete = computed(() => {
  return props.option === isDeletion;
});

function handleGrandParentSelectChange(newValue: string) {
  folderGrandParentSelect.value = newValue;
  folderParentSelect.value = null;
  folderChildSelect.value = null;
  fileSelect.value = null;
  foldersParents.value = changeOptions(
    fileStorage.optionsParent,
    folderGrandParentSelect.value,
  );
  buildingPath(newValue, indexOfGrandParent);
}

function handleParentSelectChange(newValue: string) {
  folderParentSelect.value = newValue;
  folderChildSelect.value = null;
  fileSelect.value = null;
  foldersChild.value = changeOptions(
    fileStorage.optionsChild,
    folderParentSelect.value,
  );
  buildingPath(newValue, indexOfParent);
}

function handleChildSelectChange(newValue: string) {
  folderChildSelect.value = newValue;
  fileSelect.value = null;
  files.value = changeFiles(fileStorage.files, folderChildSelect.value);
  buildingPath(newValue, indexOfChild);
}

function handleFileSelectChange(newValue: string) {
  fileSelect.value = newValue;
  buildingPath(newValue, indexOfFile);
}

function buildingPath(folderName: string, index: number) {
  path.value.splice(index, eliminateRepeats, folderName);
}

function cleanAllFolders() {
  folderParentSelect.value = null;
  folderChildSelect.value = null;
  fileSelect.value = null;
  buildingPath("", indexOfGrandParent);
  buildingPath("", indexOfParent);
  buildingPath("", indexOfChild);
  buildingPath("", indexOfFile);
  foldersParents.value = [];
  foldersChild.value = [];
  files.value = [];
}

function cleanFoldersAndSubFolders() {
  folderParentSelect.value = null;
  folderChildSelect.value = null;
  fileSelect.value = null;
  buildingPath("", indexOfParent);
  buildingPath("", indexOfChild);
  buildingPath("", indexOfFile);
  foldersChild.value = [];
  files.value = [];
}

function cleanSubFolders() {
  folderChildSelect.value = null;
  fileSelect.value = null;
  buildingPath("", indexOfChild);
  buildingPath("", indexOfFile);
  files.value = [];
}

function cleanFiles() {
  fileSelect.value = null;
  buildingPath("", indexOfFile);
}
</script>
