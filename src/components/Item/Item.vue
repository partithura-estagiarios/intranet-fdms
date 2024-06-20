<template>
  <div class="row justify-center">
    <div v-for="item in sistemas">
      <q-item clickable @click="goToRoute(item.link)">
        <q-item-section class="border-radius-inherit">
          <q-avatar class="border-color row bg-white shadow-14" size="7.99rem">
            <q-icon
              :name="item.icon"
              class="custom-color icon-partithura q-py-md"
            />
          </q-avatar>
        </q-item-section>
        <div class="label text-start row">
          <q-item>
            <q-item-section>
              <q-item-label
                class="custom-color text-h5 text-weight-bolder font-custom"
              >
                {{ item.label }}
              </q-item-label>
              <DialogContatDirector
                @close="openModalCeo = false"
                :open="openModalCeo"
              />

              <q-item-label class="text-green text-bold text-h5 font-custom">
                {{ item.sublabel }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-item>
    </div>
    <ItemAddSystem />
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
  if (rout.includes("contatoCeo")) {
    return (openModalCeo.value = true);
  }
  return router.push(`${rout}`);
}
</script>

<style scoped>
.border-color {
  border: 8px solid rgb(31, 73, 125);
}
.custom-color {
  color: rgb(31, 73, 125);
}
.font-custom {
  font-family: Fira Sans;
}
.icon-partithura {
  height: 5.7rem;
  bottom: 0.35rem;
}
</style>
