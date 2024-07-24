<template>
  <q-menu>
    <q-list style="min-width: 100px" class="text-black">
      <q-item clickable v-close-popup>
        <q-item-section @click="showCard = true">{{
          $t("cardDocSig.addImg")
        }}</q-item-section>
      </q-item>
      <q-item clickable v-close-popup>
        <q-item-section>New incognito tab</q-item-section>
      </q-item>
      <q-separator />
    </q-list>
  </q-menu>
  <CardAddImage :card="showCard" @update-card="showCard = false" />
</template>

<script setup lang="ts">
const showCard = ref(false);
</script>
