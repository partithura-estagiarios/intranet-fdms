<template>
  <div class="q-pa-xl box-shadow mx-8 relative-position bg-white">
    <HeaderRamais @ramal="(value) => (search = value)" />
    <q-table
      :rows="definiteRamais"
      :columns="columns as Column[]"
      flat
      hide-bottom
      v-model:pagination="pagination"
      :filter="search"
    >
      <template v-slot:header-cell="props">
        <q-th :props="props" class="text-indigo">
          {{ $t(`${props.col.label}`) }}
        </q-th>
      </template>
      <template v-slot:body-cell-icon="props">
        <q-td :props="props">
          <q-avatar>
            <q-icon name="settings" />
          </q-avatar>
        </q-td>
      </template>
      <template v-slot:body-cell="props">
        <q-td :props="props" class="text-grey">
          {{ $t(`columns.${props.value}`, props.value) }}
        </q-td>
      </template>
    </q-table>
    <q-separator />
    <Pagination
      class="text-right"
      :pages="pages"
      @change-page="(index) => (indexSelection = index)"
    />
    <SeparatorForEmergence
      :texto="'400 RAMAL DE EMERGÊNCIA'"
      :large="'410px'"
    />
  </div>
</template>

<script setup lang="ts">
import { columns, firstPage } from "./lib";
import GetRamais from "../../graphql/ramais/GetRamais.gql";
import { Column } from "../../entities/column";
import { Ramal } from "../../entities/ramal";
const ramais = ref();
const definiteRamais = ref();
const pages = ref();
async function getRamais() {
  const { getRamais } = await runQuery(GetRamais);
  ramais.value = getRamais;
  pages.value = ramais.value.length;
  definiteRamais.value = ramais.value[firstPage - 1];
}
onMounted(() => {
  getRamais();
});
const indexSelection = ref();
watchEffect(() => {
  if (indexSelection.value) {
    definiteRamais.value = ramais.value[indexSelection.value - 1];
  }
});
const search = ref();
const pagination = ref({
  rowsPerPage: maxRows,
});
</script>

<style scoped>
.box-shadow {
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 15px;
}
</style>
