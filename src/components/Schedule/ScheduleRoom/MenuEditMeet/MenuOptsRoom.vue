<template>
  <q-btn
    color="black"
    icon="delete"
    flat
    @click.stop
    v-if="userStorage.getToken"
  >
    <q-menu anchor="bottom right" self="bottom left">
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section class="text-black" @click="openModal = !openModal"
            >{{ $t("action.deleteMeet") }}
          </q-item-section>
        </q-item>
        <!-- <q-item clickable v-close-popup>
          <q-item-section class="text-black" @click="openEdit = true">{{
            $t("action.editMeet")
          }}</q-item-section>
        </q-item> -->
      </q-list>
    </q-menu>
  </q-btn>
  <ModalExcludeMeet
    :confirm="openModal"
    @close="openModal = !openModal"
    @exclude="$emit('exclude')"
  />
  <EditCardMeet
    :meet="props.meet"
    :confirm="openEdit"
    @close="openEdit = !openEdit"
    @edit="handleConfirm"
  />
</template>

<script setup lang="ts">
import { EditEventInterface } from "../../../../entities/scheduleRoom";
import { useUsers } from "../../../../stores/user";
import { useEvents } from "../../../../stores/events";

const userStorage = useUsers();
const eventStorage = useEvents();

const emits = defineEmits(["edit", "exclude"]);
const props = defineProps({
  meet: {
    type: Object,
    required: true,
  },
});
const openModal = ref(false);
const openEdit = ref(false);
function handleConfirm(val: EditEventInterface, val2: string) {
  emits("edit", val, val2);
}
watchEffect(() => {
  if (!eventStorage.loadingCardEdit) {
    openEdit.value = false;
  }
});
</script>
