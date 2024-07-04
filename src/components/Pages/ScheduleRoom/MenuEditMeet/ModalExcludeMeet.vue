<template>
  <q-dialog v-model="props.confirm">
    <q-card>
      <q-card-section class="row items-center">
        <span class="text-black">{{ $t("text.messageExcludeEvent") }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          :label="$t('action.cancel.index')"
          color="primary"
          @click="$emit('close')"
        />
        <q-btn
          flat
          :label="$t('action.confirm')"
          color="primary"
          @click="$emit('exclude')"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  confirm: { type: Boolean, required: true },
});
</script>
