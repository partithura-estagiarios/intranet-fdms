<template>
  <q-file
    v-model="img"
    :label="$t('cardDocSig.addImg')"
    flat
    @update:model-value="$emit('envity-img', img)"
  />
</template>

<script setup>
const img = ref();
</script>

<style scoped>
.size-widht {
  width: 30rem;
}
</style>
