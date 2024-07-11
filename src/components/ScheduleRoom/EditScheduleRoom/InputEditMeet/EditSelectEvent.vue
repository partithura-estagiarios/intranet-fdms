<template>
  <q-select v-model="model" :options="rooms" :label="$t('text.selectRoom')">
    <template #option="{ opt }">
      <q-item class="text-black" clickable>
        <q-item-section @click="model = opt" v-close-popup>
          <q-item-label>{{ opt }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import LoadRooms from "../../../../graphql/rooms/LoadRooms.gql";
import { Rooms } from "../../../../entities/rooms";

const emits = defineEmits(["envity-new-room"]);
const props = defineProps({
  option: {
    type: String,
    required: true,
  },
});
const rooms = ref<string[]>([]);
async function carregarSalas() {
  const { loadRooms }: { loadRooms: Rooms[] } = await runQuery(LoadRooms);
  loadRooms.forEach((room: Rooms) => {
    rooms.value.push(room.name);
  });
}
const model = ref(props.option);
watchEffect(() => {
  emits("envity-new-room", model.value);
});
onMounted(() => {
  carregarSalas();
});
</script>
