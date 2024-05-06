<template>
  <q-dialog v-model="props.confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="rule_folder" color="indigo" text-color="white" />
        <span class="q-ml-sm">{{ $t("action.stillFiles") }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          :label="$t('action.cancel.index')"
          color="indigo-8"
          @click="emits('close')"
        />
        <q-btn
          flat
          :label="$t('action.confirm')"
          color="indigo-8"
          @click="confirmDelete"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  confirm: {
    type: Boolean,
    required: true,
  },
  file: {
    type: String,
    default: "",
  },
  filePath: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["close", "confirmExclusion"]);
function confirmDelete() {
  emits("confirmExclusion");
}
</script>
