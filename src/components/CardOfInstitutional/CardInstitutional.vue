<template>
  <q-card class="my-card" bordered>
    <q-card-section horizontal>
      <q-card-section>
        <FoldersNamesImgs
          :foldersName="namesOfImgs"
          @envity-name="(val: string) => (titleImg = val)"
        />
      </q-card-section>
      <q-card-section class="col-19 flex flex-center">
        <ImgsInstitutional :folders="allFolders" :name="titleImg" />
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import GetAllImgs from "../../graphql/institutionalImgs/GetAllImgs.gql";
import { FoldersIntitutional } from "../../entities/imgsInstitutional";
import { createPath } from "./lib";
import { useImgs } from "../../stores/imgs";

const imgsStorage = useImgs();
const namesOfImgs = ref<string[]>([]);
const allFolders = ref<any[]>([]);
const titleImg = ref();

async function loadAllDocsInt() {
  const { getAllImgs }: { getAllImgs: FoldersIntitutional[] } =
    await runQuery(GetAllImgs);
  allFolders.value = createPath(getAllImgs);
  namesOfImgs.value = getAllImgs.map((folder) => folder.name);
  imgsStorage.setFoldersImgs(namesOfImgs.value);
}

watchEffect(() => {
  if (imgsStorage.reload) {
    loadAllDocsInt();
    imgsStorage.refreshReload;
  }
});

onMounted(async () => {
  loadAllDocsInt();
});
</script>
<style scoped>
.my-card {
  max-height: 45rem;
  height: 45rem;
  width: 89rem;
  padding-inline: 5rem;
}
</style>
