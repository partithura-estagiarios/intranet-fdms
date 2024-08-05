<template>
  <q-card class="row my-card">
    <q-card-section class="col-4">
      <q-item clickable v-for="name in imgsStorage.certifications" :key="name">
        <q-item-section :class="itemClasses(name)" @click="selectItem(name)">
          {{ formatTabLabel(name) }}
        </q-item-section>
      </q-item>
    </q-card-section>

    <q-card-section
      :class="$q.screen.lt.lg ? 'col-6' : 'col-5'"
      v-if="isImageValid"
    >
      <q-img :src="getImageUrl(selectedTab)" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import LoadCertifications from "../../graphql/certification/LoadCertifications.gql";
import { server_express_url } from "../CardOfInstitutional/lib";
import { useImgs } from "../../stores/imgs";

const imgsStorage = useImgs();
const selectedTab = ref<string>("");
const CUSTOM_REPLACE = /([a-zA-Z])([0-9])/g;
const ADD_HIFEN = "$1-$2";
const FIRST_CERTIFICATION_INDEX = 0;
const EMPTY_IMAGE_NAME = "";
const isImageValid = computed(() => {
  return imgsStorage.certifications.includes(selectedTab.value);
});

async function loadCertifications() {
  const { loadCertifications }: { loadCertifications: string[] } =
    await runQuery(LoadCertifications);
  imgsStorage.setFoldersCertifications(loadCertifications);
}

onMounted(async () => {
  await loadCertifications();
});

const getImageUrl = (imageName: string) => {
  return `${server_express_url}/serve-image-doc/${encodeURIComponent(imageName)}`;
};

const formatTabLabel = (name: string) => {
  const nameWithoutExtension = name.split(".")[0];
  const formattedName = nameWithoutExtension.replace(CUSTOM_REPLACE, ADD_HIFEN);
  return formattedName;
};

const itemClasses = computed(() => {
  return (name: string) => {
    const isSelected = selectedTab.value === name;
    return isSelected ? "bg-green text-white" : "text-black";
  };
});

function selectItem(name: string) {
  selectedTab.value = name;
}

watchEffect(() => {
  if (!isImageValid.value) {
    selectedTab.value =
      imgsStorage.certifications.length > FIRST_CERTIFICATION_INDEX
        ? imgsStorage.certifications[FIRST_CERTIFICATION_INDEX]
        : EMPTY_IMAGE_NAME;
  }
  if (imgsStorage.reloadCertification) {
    loadCertifications();
    return imgsStorage.refreshCertificationsReload;
  }
});
</script>

<style scoped>
.my-card {
  width: 80rem;
  margin-inline: 8rem;
  height: 49rem;
  margin-top: -7rem;
}
</style>
