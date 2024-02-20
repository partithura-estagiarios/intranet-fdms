<template>
  <div class="q-pa-xl box-shadow mt-10 mx-8">
    <HeaderRamais @ramal="(value) => (search = value)" />
    <q-table
      :rows="ramais"
      :columns="columns"
      row-key="name"
      flat
      hide-bottom
      :filter="search"
    >
      <template v-slot:header-cell="props">
        <q-th :props="props" class="text-indigo">
          {{ $t(`columns.${props.col.name}`) }}
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
    <Pagination class="text-right" />

    <SeparatorForEmergence
      :texto="'400 RAMAL DE EMERGÊNCIA'"
      :large="'410px'"
    />
  </div>
</template>

<script setup lang="ts">
import { ramais, columns } from "./lib";

const search = ref();
</script>

<style scoped>
.box-shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 15px;
}
</style>
