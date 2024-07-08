<template>
  <div>
    <q-dialog v-model="props.confirm">
      <q-card>
        <DialogHeader option="action.editMeet" @close="$emit('close')" />
        <InputsEditEvent
          :meet="props.meet"
          @envity-edit="(val) => (host = val)"
        />
        <q-input
          v-model="otherMaterials"
          class="q-px-sm"
          :label="$t('text.otherMaterials')"
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
const otherMaterials = ref(props.meet.support.helpers);
function handleConfirm() {
  emits("edit", host, otherMaterials);
}
</script>
