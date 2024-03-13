<template>
  <div class="q-pa-xl box-shadow mx-8 relative-position bg-white">
    <HeaderRamais @ramal="(value) => (search = value)" />
    <q-table
      :rows="ramais"
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
            <DropdownSettings
              :options="['deleteRamal', 'editRamal']"
              :ramal="props.row"
              :pages="pages"
              @envity-ramal-custom="(item) => (ramalOfTable = item)"
              @reload="getRamais"
            />
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
import { columns, maxRows, pagesForTable } from "./lib";
import { Column } from "../../entities/column";
import * as Query from "../../graphql/ramais/queries.gql";
const ramais = ref();
const pages = ref();
const indexSelection = ref();
const search = ref();
const pagination = ref({
  rowsPerPage: maxRows,
});
async function getRamais() {
  const { getRamaisForPage } = await runQuery(Query.GetRamaisForPage, {
    page: indexSelection.value,
  });
  ramais.value = getRamaisForPage;
}
onMounted(async () => {
  await getRamais();
  const { getLenghtRamais } = await runQuery(Query.GetLenghtRamais);
  pages.value = pagesForTable(getLenghtRamais);
});
watchEffect(() => {
  if (indexSelection.value >= 0) {
    getRamais();
  }
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
