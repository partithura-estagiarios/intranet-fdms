<template>
  <div v-for="(card, index) in cards" :key="card.id" class="row col-3 q-pa-md">
    <q-card class="my-card text-center relative-position window-width">
      <q-card-section class="bg-indigo-8">
        <div class="title-card text-h6 text-white">
          {{ card.title }}
        </div>
      </q-card-section>

      <q-card-actions class="q-pa-xl" vertical>
        <div class="text-h6">
          <q-icon name="event" class="ico" size="2em" color="indigo-8" />
          {{ card.author }}
        </div>
      </q-card-actions>
      <q-card-actions vertical>
        <div class="text-lowercase q-pa-md absolute-bottom-right">
          <q-btn color="indigo-8" to="/pageSeeMore" no-caps>
            <div>{{ $t(text.seeMore) }}</div>
          </q-btn>
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import text from "../../../locales/br/text";
import { cards } from "./lib";
</script>
