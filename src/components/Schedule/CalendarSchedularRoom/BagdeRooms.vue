<template>
  <div class="row justify-center font-custom">
    <div v-for="item in rooms" class="col-auto q-pa-md">
      <div class="row items-center">
        <q-badge
          rounded
          :style="`background-color:${item.color}`"
          class="q-mx-sm"
        />
        <span class="text-body1 text-black">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadRooms from "../../../graphql/rooms/LoadRooms.gql";

const rooms = ref();
async function carregarSalas() {
  const { loadRooms }: { loadRooms: Object } = await runQuery(LoadRooms);
  rooms.value = loadRooms;
}
onMounted(async () => {
  carregarSalas();
});
</script>
