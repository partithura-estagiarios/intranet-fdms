<template>
  <div class="main-container">
    <BarUp />
    <Paralax class="paralax" />
    <CustomSeparator class="separator" texto="DESTAQUES" />
    <Carousel class="carousel" />
    <CarouselTitles />
    <CustomSeparator class="separator" texto="OUTROS" />
    <div class="row">
      <div v-for="(card, index) in cards" :key="index" class="col-4 q-pa-md">
        <q-item clickable v-ripple>
          <q-avatar size="6.5rem">
            <img class="rounded" :src="card.avatar" />
          </q-avatar>

          <q-card-actions vertical class="justify-around q-px-md">
            <q-item-label class="text-grey-8 text-h6 text-weight-bolder">
              {{ card.name }}
            </q-item-label>
            <q-item-label class="text-grey text-weight-bolder">
              {{ card.description }}
            </q-item-label>
          </q-card-actions>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cards = [
  {
    name: "Junior",
    description: "Junior",
    avatar: "https://cdn.quasar.dev/img/avatar.png",
  },
  {
    name: "Junior",
    description: "Junior",
    avatar: "https://cdn.quasar.dev/img/avatar.png",
  },
  {
    name: "Junior",
    description: "Junior",
    avatar: "https://cdn.quasar.dev/img/avatar.png",
  },
  {
    name: "Junior",
    description: "Junior",
    avatar: "https://cdn.quasar.dev/img/avatar.png",
  },
  {
    name: "Junior",
    description: "Junior",
    avatar: "https://cdn.quasar.dev/img/avatar.png",
  },
  {
    name: "Junior",
    description: "Junior",
    avatar: "https://cdn.quasar.dev/img/avatar.png",
  },
];
</script>

<style scoped>
.separator {
  z-index: 1;
  position: relative;
}

.paralax {
  margin-top: 103px;
}
.carousel {
  top: -34px;
  position: relative;
}

.row {
  justify-content: center;
}
</style>
