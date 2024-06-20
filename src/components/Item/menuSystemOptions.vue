<template>
  <q-menu touch-position>
    <q-list>
      <q-item clickable v-close-popup v-for="option in options">
        <q-item-label class="text-black">{{
          $t(`action.${option}`)
        }}</q-item-label>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup lang="ts">
import { options } from "./lib";
</script>
