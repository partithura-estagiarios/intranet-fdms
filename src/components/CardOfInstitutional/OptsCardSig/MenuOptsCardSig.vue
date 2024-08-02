<template>
  <q-menu>
    <q-list class="text-black">
      <q-item clickable v-close-popup v-if="imgsStorage.folders.length">
        <q-item-section @click="showCard = true">{{
          $t("cardDocSig.addImg")
        }}</q-item-section>
      </q-item>
      <q-item clickable v-close-popup>
        <q-item-section @click="showCardFolder = true">{{
          $t("action.addFolder")
        }}</q-item-section>
      </q-item>
      <q-separator />
    </q-list>
  </q-menu>
  <CardAddImage :card="showCard" @update-card="showCard = false" />
  <CardAddFolderInst
    :card="showCardFolder"
    @update-card-folder="showCardFolder = false"
  />
</template>

<script setup lang="ts">
import { useImgs } from "../../../stores/imgs";

const imgsStorage = useImgs();
const showCard = ref(false);
const showCardFolder = ref(false);
</script>
