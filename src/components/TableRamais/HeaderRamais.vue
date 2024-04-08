<template>
  <div class="row justify-between">
    <div class="q-pa-md">
      <q-btn
        class="bg-green text-white q-px-md"
        :label="$t('text.addRamal')"
        @click="openDialog()"
      />
    </div>
    <q-input :label="$t('text.searchRamal')" v-model="search" color="indigo-8 ">
      <template v-slot:append>
        <!-- <q-icon
          name="search"
          color="indigo-8"
          <!-- @click="searchRamalInBack()" -->
        class="cursor-pointer" /> -->
      </template>
    </q-input>
  </div>
</template>
<script setup lang="ts">
import * as Query from "../../graphql/ramais/queries.gql";
const dialogVisible = ref(false);
const emits = defineEmits(["envityRamal-table"]);
const search = ref();
const receivedRamal = ref();

function openDialog() {
  dialogVisible.value = true;
}

// async function searchRamalInBack() {
//   const { searchRamal } = await runQuery(Query.SearchRamal, {
//     word: search.value,
//   });
//   emits("envityRamal-table", searchRamal);
// }
</script>
