<template>
  <div class="q-pa-lg flex justify-end">
    <q-pagination
      v-model="current"
      color="green"
      :max="ramaisStorage.getPages"
      @update:model-value="changePage()"
    />
  </div>
</template>
<script setup lang="ts">
import { useRamais } from "../../stores/ramais";
import { firstIndex } from "../TableRamais/lib";

const ramaisStorage = useRamais();
const current = ref(ramaisStorage.pagination + firstIndex);

async function changePage() {
  ramaisStorage.pagination = current.value;
  await ramaisStorage.loadRamais(ramaisStorage.pagination - firstIndex);
}
onMounted(async () => {
  await ramaisStorage.loadRamais(ramaisStorage.pagination);
});
</script>
