<template>
  <q-select
    stack-label
    :label="$t(props.title)"
    v-model="folderSelect"
    :options="folderList"
    @update:model-value="handle"
  >
    <template v-if="folderSelect" v-slot:append>
      <q-icon
        name="cancel"
        @click.stop.prevent="clean"
        class="cursor-pointer"
      />
    </template>
  </q-select>
</template>

<script setup lang="ts">
const emits = defineEmits(["handleSelect", "cleanFolders"]);
const folderList = ref();
const folderSelect = ref();
const props = defineProps({
  folders: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  folderSelect: {
    type: String,
    required: true,
  },
});
watchEffect(() => {
  if (props.folders) {
    return (folderList.value = props.folders);
  }
  folderList.value = [];
});
watchEffect(() => {
  if (props.folderSelect) {
    return (folderSelect.value = props.folderSelect);
  }
  folderSelect.value = null;
});
function handle() {
  emits("handleSelect", folderSelect.value);
}
function clean() {
  folderSelect.value = null;
  emits("cleanFolders");
}
</script>
