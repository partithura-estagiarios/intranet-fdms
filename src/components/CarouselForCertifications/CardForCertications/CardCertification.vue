<template>
  <q-card>
    <q-card-section class="bg-indigo-8 text-h6 row text-white">
      <div class="col-grow">{{ props.title }}</div>
      <div class="col-auto">
        <q-btn flat icon="print" size="25px" />
      </div>
    </q-card-section>
    <q-card-section>
      <q-img :src="props.imgsEx" />
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
const props = defineProps({
  imgsEx: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>
