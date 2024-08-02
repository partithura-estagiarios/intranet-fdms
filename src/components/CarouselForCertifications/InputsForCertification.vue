<template>
  <q-input
    v-model="numberCertification"
    label="Numero da Certificação"
    type="number"
    :rules="[(val) => validateNotEmpty(val)]"
  />
  <q-input
    v-model="nameCertification"
    label="Nome da Certificação"
    :rules="[(val) => validateNotEmpty(val)]"
  />
  <q-file
    v-model="certification"
    :label="$t('cardDocSig.addImg')"
    flat
    :rules="[(val) => validateInputOfFileOrImg(val)]"
  />
</template>

<script setup>
import { useFieldValidation } from "../../composables/rules";

const { validateNotEmpty, validateInputOfFileOrImg } = useFieldValidation();
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
