<template>
  <div class="fixed-center">
    <q-card class="my-card" flat bordered>
      <q-card-section align="center" class="bg-indigo-8">
        <div class="text-h3 text-bold text-white q-px-xl px-50">
          {{ $t("register.registerUser") }}
        </div>
      </q-card-section>
      <q-card-section class="q-pa-xl pt-20" align="center">
        <q-form class="q-gutter-md">
          <div v-for="(item, index) in data" :key="index">
            <q-input
              rounded
              white
              standout="bg-grey-4 "
              v-model="inputValues[index]"
              :label="$t(`register.${item}`)"
            >
              <template v-slot:append>
                <q-icon
                  v-show="verifyText(item as string)"
                  color="grey"
                  class="cursor-pointer"
                  @click="isPwdvisible = !isPwdvisible"
                  :name="pwdIconName"
                />
              </template>
            </q-input>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions class="justify-center q-pa-xl">
        <div class="bg-green-8 row text-white px-14" rounded>
          <q-btn size="xl" flat :label="$t('register.register')" />
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { data } from "./lib"; // Assuming 'lib' exports the data

const isPwdvisible = ref(true);
const inputValues = ref(Array(data.length).fill(""));

const pwdIconName = computed(() => {
  return isPwdvisible.value ? "visibility_off" : "visibility";
});

function verifyText(item: string) {
  return item.includes("ss");
}
</script>

<style scoped>
.row {
  border-radius: 50px;
}
</style>
