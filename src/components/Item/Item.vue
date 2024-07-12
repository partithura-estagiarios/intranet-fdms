<template>
  <div
    class="row"
    :class="$q.screen.lt.lg ? 'justify-between' : 'justify-center'"
  >
    <div v-for="item in systemStorage.getSistemas">
      <q-item
        :clickable="!systemStorage.getBadgeExclusion"
        @click="systemStorage.goToRoute(item.link)"
      >
        <q-item-section class="border-radius-inherit">
          <q-avatar class="border-color row bg-white shadow-14" size="7.99rem">
            <q-badge
              color="red cursor-pointer"
              floating
              v-if="systemStorage.getBadgeExclusion"
              :clickable="systemStorage.getBadgeExclusion"
              @click="systemStorage.excludeSystemId(item.system_id)"
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
                @close="systemStorage.openModalCeo = false"
                :open="systemStorage.openModalCeo"
              />

              <q-item-label class="text-green text-bold text-h5 font-custom">
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
import { useSystems } from "../../stores/system";

const systemStorage = useSystems();
const props = defineProps({
  sistema: {
    type: String!,
    required: true,
  },
});

onMounted(async () => {
  systemStorage.loadSystems(props.sistema);
});
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
