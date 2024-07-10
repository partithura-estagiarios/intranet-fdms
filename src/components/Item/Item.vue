<template>
  <div
    class="row"
    :class="$q.screen.lt.lg ? 'justify-between' : 'justify-center'"
  >
    <div v-for="item in sistemas">
      <q-item :clickable="!showBadgeExclusion" @click="goToRoute(item.link)">
        <q-item-section class="border-radius-inherit">
          <q-avatar class="border-color row bg-white shadow-14" size="7.99rem">
            <q-badge
              color="red cursor-pointer"
              floating
              v-if="showBadgeExclusion"
              :clickable="showBadgeExclusion"
              @click="excludeSystemId(item.system_id)"
              ><q-icon name="delete" size="sm"
            /></q-badge>
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
    <ItemSystem
      @receveid="loadSystems()"
      @activeBadgeExclusion="showBadgeExclusion = !showBadgeExclusion"
      v-if="userStorage.getToken"
    />
  </div>
</template>

<script setup lang="ts">
import LoadSystems from "../../graphql/system/queries.gql";
import DeleteSystem from "../../graphql/system/DeleteSystem.gql";
import { useUsers } from "../../stores/user";
import { router } from "../../modules/router";

const userStorage = useUsers();
const props = defineProps({
  sistema: {
    type: String!,
    required: true,
  },
});
const sistemas = ref();
const openModalCeo = ref();
const showBadgeExclusion = ref(false);

onMounted(async () => {
  loadSystems();
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

async function loadSystems() {
  const { loadSystems }: { loadSystems: Object } = await runQuery(LoadSystems, {
    sistema: props.sistema,
  });
  sistemas.value = loadSystems;
}
async function excludeSystemId(id: number) {
  const { deleteSystem }: { deleteSystem: Object } = await runQuery(
    DeleteSystem,
    {
      systemId: id,
    },
  );
  sistemas.value = deleteSystem;
  await loadSystems();
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
