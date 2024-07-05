<template>
  <q-card-section align="right">
    <div class="font-custom">
      <q-btn
        color="green"
        :label="$t('formRamal.confirm')"
        @click="$emit('confirm')"
      />
    </div>
  </q-card-section>
</template>
