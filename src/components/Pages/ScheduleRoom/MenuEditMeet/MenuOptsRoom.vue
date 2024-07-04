<template>
  <q-btn color="black" icon="edit" flat @click.stop>
    <q-menu anchor="bottom right" self="bottom left">
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section class="text-black" @click="openModal = !openModal"
            >{{ $t("action.deleteMeet") }}
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup>
          <q-item-section class="text-black" @click="openEdit = !openEdit">{{
            $t("action.editMeet")
          }}</q-item-section>
        </q-item>
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
    @edit="(val) => $emit('edit', val)"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  meet: {
    type: Object,
    required: true,
  },
});
const openModal = ref(false);
const openEdit = ref(false);
</script>
