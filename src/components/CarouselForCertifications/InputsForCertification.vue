<template>
  <q-input v-model="re" label="Numero da Certificação" type="number" />
  <q-input v-model="re2" label="Nome da Certificação" />
  <q-file
    v-model="img"
    :label="$t('cardDocSig.addImg')"
    flat
    @update:model-value="$emit('envity-img', img)"
  />
</template>

<script setup>
const emits = defineEmits("envity-all-inputs");

const re = ref();
const re2 = ref();
const img = ref();
watchEffect(() => {
  emits("envity-all-inputs", re.value, re2.value, img.value);
});
</script>
