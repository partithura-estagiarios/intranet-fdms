<template>
  <q-list v-for="item in institutional" class="text-indigo-8">
    <q-item
      clickable
      @click="setLink(item.name)"
      :class="{ 'text-white bg-green rounded-borders': link === item.name }"
    >
      <q-item-section>
        {{
          item.name === undefined
            ? $t("cardDocSig.processes")
            : $t("cardDocSig." + item.name)
        }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import LoadCertifications from "../../../graphql/certification/queries.gql";
import { useFiles } from "../../../stores/files";
const filesStorage = useFiles();
import { getFirstImage } from "../lib";
const props = defineProps({
  tabSelect: {
    type: String,
    default: "institutional",
  },
});
const link = ref();
const emits = defineEmits(["showImage", "envityImgs"]);
const institutional = ref();
const loadInsitucional = async () => {
  const { loadCertifications } = await runQuery(LoadCertifications, {
    title: "docSig",
  });
  institutional.value = loadCertifications;
  emits("envityImgs", institutional.value);
  setLink(getFirstImage(institutional.value));
};
const loadProcess = async () => {
  const files = await filesStorage.fetchFileList();
  institutional.value = [files];
  emits("envityImgs", institutional.value);
  setLink(getFirstImage(institutional.value));
};
function setLink(item: string) {
  link.value = item;
  emits("showImage", link.value);
}
watchEffect(async () => {
  if (props.tabSelect == "institutional") {
    loadInsitucional();
  }
  if (props.tabSelect == "processes" || "attFiles") {
    loadProcess();
  }
});
</script>
