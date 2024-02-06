<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="card-carousel justify-center">
      <q-carousel v-model="slide" class="card-carousel">
        <q-carousel-slide name="style" class="slide justify-center">
          <div class="row justify-center">
            <q-card
              v-for="(card, index) in cards"
              :key="card.id"
              class="my-card col-4 q-my-md text-center"
            >
              <q-card-section class="bg-indigo-8">
                <div class="title-card text-h6 text-white">
                  {{ card.title }}
                </div>
              </q-card-section>

              <q-card-actions vertical>
                <div class="text-h6">
                  <q-icon
                    name="event"
                    class="ico"
                    size="2em"
                    color="indigo-8"
                  />
                  {{ card.author }}
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const slide = ref("style");
const current = ref(3);

const cards = ref([
  { id: 1, title: "Integração 1", author: "John Doe" },
  { id: 2, title: "Integração 2", author: "Jane Doe" },
  { id: 3, title: "Integração 3", author: "Bob Smith" },
  { id: 4, title: "Integração 4", author: "Alice Johnson" },
  { id: 5, title: "Integração 5", author: "Eve Johnson" },
  // Add more cards as needed
]);
</script>

<style scoped>
.my-card {
  border-radius: 20px;
  overflow: hidden;
}
.card-carousel {
}
.title-card {
  border-radius: 20px;
}
</style>
