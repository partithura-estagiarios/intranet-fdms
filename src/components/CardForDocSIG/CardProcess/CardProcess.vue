<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <div class="q-pt-xl">
        <RootFolders
          :folderTree="folderTreeSelect"
          @selectFolderTree="(val) => (folderOfRootSelect = val)"
        />
      </div>
      <div>
        <ShowFolders
          :selectTreeFolder="folderOfRootSelect"
          @selectFolderChild="(val) => (folderChildSelect = val)"
        />
        <ShowArchives :childFolder="folderChildSelect" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useFiles } from "../../../stores/files";
const fileStorage = useFiles();
const props = defineProps({
  folderParent: {
    type: String,
    required: false,
  },
});
const folderTreeSelect = ref();
const folderOfRootSelect = ref();
const folderChildSelect = ref();
watchEffect(() => {
  if (props.folderParent) {
    fileStorage.toggleFolderTreeState(props.folderParent);
    folderTreeSelect.value = props.folderParent;
    folderOfRootSelect.value = "";
    folderChildSelect.value = "";
  }
});
</script>
