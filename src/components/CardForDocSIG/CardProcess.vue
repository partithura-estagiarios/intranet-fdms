<template>
  <div class="justify-center justify-center q-gutter-sm flex">
    <div class="room" v-for="file in props.files">
      <q-item class="col-4">
        <q-item-section avatar>
          <q-avatar color="indigo-8" text-color="white">
            <q-icon name="description" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label
            ><a href="#" @click="filesStorage.displayImage(file)">
              {{ file }}
            </a></q-item-label
          >
        </q-item-section>

        <q-item-section side>
          <q-btn icon="delete" color="green" @click="deleteFile(file)" />
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useFiles } from "../../stores/files";
const props = defineProps({
  files: {
    Type: Array,
    default: [],
  },
});
const filesStorage = useFiles();
async function deleteFile(file) {
  const files = await filesStorage.deleteFile(file);
}
</script>
<style scoped>
.room {
  max-width: 90%;
  width: 300px;
}
</style>
