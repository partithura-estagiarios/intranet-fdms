<template>
  <div class="row justify-center">
    <div class="q-pa-md q-gutter-sm row">
      <q-btn
        no-caps
        class="button text-indigo-8 text-uppercase"
        style="margin: 2px"
        @click="$emit('today')"
      >
        {{ $t("text.now") }}
      </q-btn>
      <q-btn
        no-caps
        class="button text-indigo-8 text-uppercase"
        style="margin: 2px"
        @click="$emit('prev')"
      >
        &lt; {{ $t("text.previous") }}
      </q-btn>
      <q-btn
        no-caps
        class="button text-indigo-8 text-uppercase"
        style="margin: 2px"
        @click="$emit('next')"
      >
        {{ $t("text.next") }}
        &gt;
      </q-btn>
    </div>
  </div>
</template>
