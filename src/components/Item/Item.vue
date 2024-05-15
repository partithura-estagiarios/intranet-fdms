<template>
  <div class="row justify-center q-mt-md q-ml-xl">
    <div v-for="item in sistemas">
      <q-item clickable @click="goToRoute(item.link)">
        <q-item-section class="border-radius-inherit">
          <q-avatar class="border row" size="10em">
            <q-icon
              :name="item.icon"
              color="indigo-7"
              size="1.3em"
              class="q-gutter-x-ls q-gutter-y-sm"
            />
          </q-avatar>
        </q-item-section>
        <div class="label text-start row">
          <q-item>
            <q-item-section>
              <q-item-label class="text-indigo-8 text-h6 text-weight-bolder">
                {{ item.label }}
              </q-item-label>
              <DialogContatDirector
                @close="openModalCeo = false"
                :open="openModalCeo"
              />

              <q-item-label class="text-green text-bold text-h6">
                {{ item.sublabel }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadSystems from "../../graphql/system/queries.gql";
import { router } from "../../modules/router";
const props = defineProps({
  sistema: {
    type: String!,
    required: true,
  },
});
const sistemas = ref();
const openModalCeo = ref();
onMounted(async () => {
  const { loadSystems }: { loadSystems: Object } = await runQuery(LoadSystems, {
    sistema: props.sistema,
  });
  sistemas.value = loadSystems;
});
function goToRoute(rout: String) {
  if (rout.includes("https")) {
    return window.open(`${rout}`);
  }
  if (rout.includes("local")) {
    return (openModalCeo.value = true);
  }
  return router.push(`${rout}`);
}
</script>

<style scoped>
.border {
  border: 5px solid rgb(34, 34, 199);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
