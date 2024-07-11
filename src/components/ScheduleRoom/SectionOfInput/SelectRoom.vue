<template>
  <div class="q-pa-sl q-pt-md col-6">
    <q-select
      v-model="model"
      :options="rooms"
      :label="$t('text.selectRoom')"
      class="col-4 border"
    >
      <template #option="{ opt }">
        <q-item class="text-black" clickable>
          <q-item-section @click="model = opt" v-close-popup>
            <q-item-label>{{ opt }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
      <template #prepend>
        <q-icon
          :name="props.options.icon"
          class="full-height q-px-md custom-color"
          color="white"
        /> </template
    ></q-select>
  </div>
</template>

<script setup lang="ts">
import LoadRooms from "../../../graphql/rooms/LoadRooms.gql";
import { Rooms } from "../../../entities/rooms";
const emits = defineEmits(["envityDates"]);
const rooms = ref<string[]>([]);
const props = defineProps({
  options: {
    type: Object,
    default: {},
  },
});
const model = ref(props.options.value);

async function carregarSalas() {
  const { loadRooms }: { loadRooms: Rooms[] } = await runQuery(LoadRooms);
  loadRooms.forEach((room: Rooms) => {
    rooms.value.push(room.name);
  });
}

watchEffect(() => {
  if (model.value) {
    emits("envityDates", model.value);
  }
});
onMounted(async () => {
  carregarSalas();
});
</script>

<style scoped>
.border {
  border: 0.1rem rgb(31, 73, 125) solid;
}
.custom-color {
  background-color: rgb(31, 73, 125);
}
</style>
