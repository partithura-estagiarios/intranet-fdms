<template>
  <div class="q-pa-xl box-shadow mx-8 pt-3 relative-position bg-white">
    <HeaderRamais
      @envityRamal-table="(wordRamal) => searchRamal(wordRamal)"
      @reload="reloadRamais"
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
      <template v-slot:body-cell-icon="props">
        <q-td :props="props">
          <q-avatar>
            <DropdownSettings
              :options="['deleteRamal', 'editRamal']"
              :ramal="props.row"
              @reloadAfterActionRamal="reloadRamais"
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
      @change-page="(index) => getRamais(index)"
    />
    <SeparatorForEmergence
      :texto="'400 RAMAL DE EMERGÊNCIA'"
      :large="'410px'"
    />
  </div>
</template>

<script setup lang="ts">
import RamaisForPageLoad from "../../graphql/ramais/RamaisForPageLoad.gql";
import { columns, pagesOfTable } from "./lib";
import { Column } from "../../entities/column";
import GetLenghtRamais from "../../graphql/ramais/GetLenghtRamais.gql";
import { Ramal } from "../../modules/graphql/graphql";
import SearchRamal from "../../graphql/ramais/SearchRamal.gql";
const searchRamalWord = ref();
const ramais = ref();
const pages = ref();
const pagination = ref({
  rowsPerPage: pagesOfTable,
});
const saveIndexPages = ref();
async function getRamais(page: number) {
  saveIndexPages.value = page;
  const { ramaisForPageLoad }: { ramaisForPageLoad: Array<Ramal> } =
    await runQuery(RamaisForPageLoad, {
      page: saveIndexPages.value,
    });

  ramais.value = ramaisForPageLoad;
  getSizeOfRamais();
}
async function getSizeOfRamais() {
  const { getLenghtRamais }: { getLenghtRamais: String } = await runQuery(
    GetLenghtRamais,
    {
      maxPages: pagesOfTable,
    },
  );
  pages.value = getLenghtRamais;
}

async function searchRamal(word: string) {
  searchRamalWord.value = word;
  const { searchRamal }: { searchRamal: Ramal[] } = await runQuery(
    SearchRamal,
    {
      word: word,
    },
  );
  ramais.value = searchRamal;
}
async function reloadRamais() {
  if (!searchRamalWord.value) {
    return await getRamais(saveIndexPages.value);
  }
  await searchRamal(searchRamalWord.value);
}
</script>

<style scoped>
.box-shadow {
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 15px;
}
</style>
