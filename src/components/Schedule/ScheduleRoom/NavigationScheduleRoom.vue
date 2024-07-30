<template>
  <div class="row justify-center">
    <div class="q-pa-md q-gutter-sm row">
      <q-btn
        no-caps
        class="button color-custom text-uppercase bg-white"
        @click="$emit('prev')"
      >
        &lt; {{ $t("text.previous") }}
      </q-btn>
      <q-btn
        no-caps
        class="button color-custom text-uppercase bg-white"
        @click="$emit('today')"
      >
        {{ $t("text.now") }}
      </q-btn>
      <q-btn
        no-caps
        class="button color-custom text-uppercase bg-white"
        @click="$emit('next')"
      >
        {{ $t("text.next") }}
        &gt;
      </q-btn>
    </div>
  </div>
</template>
<style scoped>
.color-custom {
  color: rgb(31, 73, 125);
}
</style>
