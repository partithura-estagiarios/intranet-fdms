<template>
  <q-input
    v-model="numberCertification"
    label="Numero da Certificação"
    type="number"
  />
  <q-input v-model="nameCertification" label="Nome da Certificação" />
  <q-file v-model="certification" :label="$t('cardDocSig.addImg')" flat />
</template>

<script setup>
const emits = defineEmits("envity-all-inputs");

const numberCertification = ref();
const nameCertification = ref();
const certification = ref();
watchEffect(() => {
  emits(
    "envity-all-inputs",
    numberCertification.value,
    nameCertification.value,
    certification.value,
  );
});
</script>
