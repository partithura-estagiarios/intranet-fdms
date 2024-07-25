<template>
  <q-menu>
    <q-list class="text-black">
      <q-item clickable v-close-popup>
        <q-item-section @click="showCard = true">{{
          $t("tab.addCertifications")
        }}</q-item-section>
      </q-item>
      <q-item clickable v-close-popup>
        <q-item-section @click="showCardFolder = true">{{
          $t("action.deleteCertification")
        }}</q-item-section>
      </q-item>
      <q-separator />
    </q-list>
  </q-menu>
  <CardAddCertification
    :card="showCard"
    @update-card-folder="showCard = false"
  />
  <CardExcludeCert
    @update-card="showCardFolder = false"
    :card="showCardFolder"
  />
</template>

<script setup>
const showCard = ref(false);
const showCardFolder = ref(false);
</script>
