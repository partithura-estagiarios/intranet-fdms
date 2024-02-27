<template>
  <q-list v-for="item in filteredInstitutional" class="text-indigo-8">
    <q-item
      clickable
      @click="setLink(item)"
      :class="{ 'text-white bg-green rounded-borders': link === item }"
    >
      <q-item-section>{{ $t("cardDocSig." + item) }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import GetTitlesSIg from "../../../graphql/docSig/GetTitlesSIg.gql";
const props = defineProps({
  tabSelect: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["showImage"]);
const institutional = ref();
const link = ref("integratedPolicy");

onMounted(async () => {
  institutional.value = await runQuery(GetTitlesSIg);
});

const filteredInstitutional = computed(() => {
  if (props.tabSelect === "institutional") {
    return institutional.value.getTitlesSigs;
  }
});

function setLink(item: string) {
  link.value = item;
  emits("showImage", link.value);
}
</script>
