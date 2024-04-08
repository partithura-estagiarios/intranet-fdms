<template>
  <div class="q-pa-xl box-shadow mx-8 pt-3 relative-position bg-white">
    <HeaderRamais
      @envityRamal-table="(ramaisSearch) => (resultSearchRamal = ramaisSearch)"
    />
    <q-table
      :rows="ramais"
      :columns="columns as Column[]"
      flat
      hide-bottom
      v-model:pagination="pagination"
    >
      <template v-slot:header-cell="props">
        <q-th :props="props" class="text-indigo">
          {{ $t(`${props.col.label}`) }}
        </q-th>
      </template>
      <!-- <template v-slot:body-cell-icon="props">
        <q-td :props="props">
          <q-avatar>
            <DropdownSettings
              :options="['deleteRamal', 'editRamal']"
              :ramal="props.row"
              @envity-ramal-custom="(item) => (ramalOfTable = item)"
              @reload="getRamais(saveIndexPages)"
            />
          </q-avatar>
        </q-td>
      </template> -->
      <template v-slot:body-cell="props">
        <q-td :props="props" class="text-grey">
          {{ $t(`columns.${props.value}`, props.value) }}
        </q-td>
      </template>
    </q-table>
    <q-separator />
    <!-- <Pagination
      class="text-right"
      :pages="pages"
       @change-page="(index) => getRamais(index) && getRamais(index)" -->
    />
    <SeparatorForEmergence
      :texto="'400 RAMAL DE EMERGÊNCIA'"
      :large="'410px'"
    />
  </div>
</template>

<script setup lang="ts">
import { columns, pagesOfTable } from "./lib";
import { Column } from "../../entities/column";
import * as Query from "../../graphql/ramais/queries.gql";
const ramais = ref();
const pages = ref();
const resultSearchRamal = ref();
const pagination = ref({
  rowsPerPage: pagesOfTable,
});
const saveIndexPages = ref();
// async function getRamais(page: Number) {
//   saveIndexPages.value = page;
//   const { getRamaisForPage } = await runQuery(Query.GetRamaisForPage, {
//     page: page - 1,
//   });

//   ramais.value = getRamaisForPage;
// }
// async function getSizeOfRamais() {
//   const { getLenghtRamais } = await runQuery(Query.GetLenghtRamais, {
//     maxPages: pagesOfTable,
//   });
//   pages.value = getLenghtRamais;
// }
// onMounted(async () => {
//   getSizeOfRamais();
// });
watchEffect(() => {
  if (resultSearchRamal) {
    ramais.value = resultSearchRamal.value;
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
