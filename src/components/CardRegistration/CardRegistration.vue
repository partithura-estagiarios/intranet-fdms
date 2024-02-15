<template>
  <div class="fixed-center">
    <q-card class="my-card" flat bordered>
      <q-card-section align="center" class="bg-indigo-8">
        <div class="text-h3 text-bold text-white q-px-xl px-50">
          {{ $t("register.registerUser") }}
        </div>
      </q-card-section>
      <q-card-section class="q-pa-xl pt-20" align="center">
        <q-form class="q-gutter-md">
          <Input :objectInput="data" class="size" />
        </q-form>
      </q-card-section>
      <q-card-actions class="justify-center q-pa-xl">
        <div class="bg-green-8 row text-white px-14" rounded>
          <q-btn size="xl" flat label="Cadastrar" />
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { data } from "./lib";
</script>
<style scoped>
.row {
  border-radius: 50px;
}
</style>
