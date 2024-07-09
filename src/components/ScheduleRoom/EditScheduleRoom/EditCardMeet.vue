<template>
  <div>
    <q-dialog v-model="props.confirm">
      <q-card>
        <DialogHeader option="action.editMeet" @close="$emit('close')" />
        <InputsEditEvent
          :meet="props.meet"
          @envity-edit="(val) => (host = val)"
        />
        <CardButtonConfirm @confirm="handleConfirm" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["edit", "close"]);

const props = defineProps({
  confirm: { type: Boolean, required: true },
  meet: { type: Object, required: true },
});
const host = ref();
function handleConfirm() {
  emits("edit", host);
}
</script>
