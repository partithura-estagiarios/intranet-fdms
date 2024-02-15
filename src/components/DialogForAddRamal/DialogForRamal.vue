<template>
  <q-dialog v-model="prompt" persistent>
    <q-responsive :ratio="16 / 9" style="width: 790px; max-width: 90%">
      <q-card>
        <q-card-section class="bg-indigo-8 row justify-between text-white">
          <div class="q-pa-md text-h5">{{ $t("text.addRamal") }}</div>
          <q-icon
            name="close"
            class="pt-2"
            size="45px"
            @click="prompt = false"
          />
        </q-card-section>
        <q-card-section>
          <q-input
            white
            v-model.lazy="label.nameOfRamal"
            :label="$t(`form.${labels[0]}`)"
          />
        </q-card-section>

        <q-card-section class="row justify-between no-wrap overflow-hidden">
          <div class="pr-12 col-7">
            <q-input
              white
              class="no-padding"
              v-model="label.numberOfRamal"
              :label="$t(`form.${labels[1]}`)"
            />
          </div>
          <div class="pl-12 col-5">
            <q-input
              white
              v-model="label.userOfRamal"
              :label="$t(`form.${labels[2]}`)"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="pt-12 pa-5 text-green-8">
          <q-btn flat :label="$t('form.confirm')" @click="prompt = false" />
        </q-card-actions>
      </q-card>
    </q-responsive>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { labels } from "./lib";
const prompt = ref(true);
const label = ref({
  nameOfRamal: "",
  numberOfRamal: "",
  userOfRamal: "",
});
</script>
