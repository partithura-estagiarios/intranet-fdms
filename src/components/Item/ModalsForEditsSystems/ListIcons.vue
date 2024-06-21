<template>
  <q-menu>
    <div class="q-px-md row scroll height-limit">
      <q-list>
        <q-item
          clickable
          v-close-popup
          v-for="option in icons"
          @click="$emit('receveid', option)"
        >
          <q-item-section>
            <q-icon :name="option" class="custom-color" size="2rem" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-menu>
</template>

<script setup lang="ts">
import { icons } from "./lib";
</script>
<style scoped>
.custom-color {
  color: rgb(31, 73, 125);
}
</style>
