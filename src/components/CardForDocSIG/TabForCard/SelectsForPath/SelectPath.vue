<template>
  <q-select
    stack-label
    :label="$t(props.title)"
    v-model="folderSelect"
    :options="folderList"
  >
    <template #option="{ opt }">
      <q-item class="text-black" clickable>
        <q-item-section @click="handle(opt)" v-close-popup>
          <q-item-label>{{ opt }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
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
function handle(opt: string) {
  folderSelect.value = opt;
  emits("handleSelect", folderSelect.value);
}
function clean() {
  folderSelect.value = null;
  emits("cleanFolders");
}
</script>
