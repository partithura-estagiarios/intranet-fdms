<template>
  <div class="row justify-center">
    <q-item clickable>
      <q-item-section class="border-radius-inherit">
        <q-avatar class="border-color row bg-white shadow-14" size="7.99rem">
          <q-icon
            :name="systemDelete.icon"
            class="custom-color icon-partithura q-py-md"
          />
        </q-avatar>
      </q-item-section>
      <div class="label text-start row">
        <q-item>
          <q-item-section>
            <q-item-label
              class="custom-color text-h5 text-weight-bolder font-custom"
            >
              {{ $t(systemDelete.label) }}
            </q-item-label>
            <q-item-label class="text-green text-bold text-h5 font-custom">
              {{ $t(systemDelete.subLabel) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <MenuSystemOptions
        @receveid="emits('receveid')"
        @optionDelete="desativeOption"
      />
    </q-item>
  </div>
</template>

<script setup lang="ts">
import { systemDelete } from "./lib";
const emits = defineEmits(["receveid", "optionDelete"]);

function desativeOption() {
  emits("optionDelete");
}
</script>

<style scoped>
.border-color {
  border: 8px solid rgb(31, 73, 125);
}
.custom-color {
  color: rgb(31, 73, 125);
}
.font-custom {
  font-family: Fira Sans;
}
.icon-partithura {
  height: 5.7rem;
  bottom: 0.35rem;
}
</style>
