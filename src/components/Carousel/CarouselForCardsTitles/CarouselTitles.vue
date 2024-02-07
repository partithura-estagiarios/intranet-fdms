<template>
  <div class="carousel-slide q-pa-md">
    <q-card
      v-for="(card, index) in cards"
      :key="card.id"
      class="my-card text-center"
    >
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
        <div class="text-lowercase see-more">
          <q-btn color="indigo-8" no-caps>
            <div>Veja mais</div>
          </q-btn>
        </div>
      </q-card-actions>
    </q-card>
    <div class="pagination">
      <q-btn
        class="btn-direction"
        unelevated
        no-caps
        label="Anterior"
        size="19px"
      />
      <q-badge
        v-for="index in 10"
        :key="index"
        @click="changeColor(index)"
        :color="buttonColors[index - 1]"
        class="btns-pag text-indigo-8"
        :class="{
          'text-white':
            activeButtonIndex === null || activeButtonIndex === index,
        }"
        unelevated
        ><span :class="{ 'text-white': activeButtonIndex === index }">{{
          index
        }}</span></q-badge
      >

      <q-btn
        class="btn-direction"
        unelevated
        no-caps
        label="Próximo"
        size="19px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cards } from "./lib";

const buttonColors = ref<string[]>(Array(10).fill("transparent"));
const activeButtonIndex = ref<number | null>(null);

const changeColor = (index: number) => {
  if (activeButtonIndex.value !== null) {
    buttonColors.value[activeButtonIndex.value - 1] = "transparent";
  }

  buttonColors.value[index - 1] = "green-8";
  activeButtonIndex.value = index;
};
</script>

<style scoped>
.btn-direction {
  padding: 10px;
  color: gray;
}
.btns-pag {
  height: 20px;
  cursor: pointer;
  font-size: large;
}
.pagination {
  grid-column: 4;
  position: relative;
}
.carousel-slide {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  grid-auto-rows: 230px 30;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: -20px;
  margin-bottom: 3%;
}
.my-card {
  border-radius: 20px;
}
.title-card {
  border-radius: 20px;
}
.see-more {
  left: 35%;
  position: relative;
  bottom: 30px;
  border-radius: 30px;
}
</style>
