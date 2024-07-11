<template>
  <q-card-section>
    <q-input v-model="nameRoom" :label="$t('text.nameRoom')" class="q-py-md" />
    <q-input filled v-model="color" :label="$t('text.colorRoom')">
      <template #prepend>
        <q-avatar :style="`background-color:${color}`" />
      </template>
      <template v-slot:append>
        <q-icon name="colorize" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-color v-model="color" no-header no-footer />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </q-card-section>
</template>

<script setup lang="ts">
const nameRoom = ref("");
const color = ref("#1279e0");
</script>
