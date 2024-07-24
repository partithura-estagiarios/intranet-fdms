<template>
  <div class="absolute-center position-div-custom">
    <IconOpts />
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
  </div>
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
onMounted(async () => {
  const { getAllImgs }: { getAllImgs: FoldersIntitutional[] } =
    await runQuery(GetAllImgs);
  allFolders.value = createPath(getAllImgs);
  namesOfImgs.value = getAllImgs.map((folder) => folder.name);
  imgsStorage.setFoldersImgs(namesOfImgs.value);
});
</script>
<style scoped>
.my-card {
  height: 45rem;
  padding-inline: 5rem;
}
.position-div-custom {
  padding-top: 5rem;
}
</style>
