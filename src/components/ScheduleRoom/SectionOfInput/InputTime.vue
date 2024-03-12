<template>
  <q-input
    filled
    v-model="initialTimeString"
    mask="time"
    :rules="['time']"
    hint="Horário de início"
  >
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time v-model="initialTimeString">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
  <q-input
    filled
    v-model="finalTimeString"
    mask="time"
    hint="Horário de término"
  >
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time v-model="finalTimeString" :hour-options="ho">
            <div class="row items-center justify-end">
              <q-btn
                v-close-popup
                label="Close"
                color="primary"
                flat
                @click="calculateTime"
              />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
const emits = defineEmits(["envityTime"]);
const initialTimeString = ref(new Date().toISOString());
const finalTimeString = ref(new Date().toISOString());
watchEffect(() => {
  if (initialTimeString) {
    finalTimeString.value = initialTimeString.value;
  }
});
function calculateTime() {
  if (initialTimeString.value > finalTimeString.value) {
    return negativeNotify("Horário inválido");
  }
  emits("envityTime", initialTimeString.value, finalTimeString.value);
}
</script>
