<template>
  <q-list v-for="item in institutional" class="text-indigo-8">
    <q-item
      clickable
      @click="setLink(item.name)"
      :class="{ 'text-white bg-green rounded-borders': link === item.name }"
    >
      <q-item-section>{{ $t("cardDocSig." + item.name) }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import LoadCertifications from "../../../graphql/certification/queries.gql";
import { getFirstImage } from "../lib";
const link = ref();
const emits = defineEmits(["showImage", "envityImgs"]);
const institutional = ref();
onMounted(async () => {
  const { loadCertifications } = await runQuery(LoadCertifications, {
    title: "docSig",
  });
  institutional.value = loadCertifications;
  emits("envityImgs", institutional.value);
  setLink(getFirstImage(institutional.value));
});

function setLink(item: string) {
  link.value = item;
  emits("showImage", link.value);
}
</script>
