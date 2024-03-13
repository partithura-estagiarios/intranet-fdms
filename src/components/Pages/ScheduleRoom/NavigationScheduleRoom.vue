<template>
  <div class="row justify-between q-mx-lg">
    <div class="column q-pa-md">
      <q-btn-group class="row justify-center q-px-xs">
        <q-btn-dropdown
          transition-show="scale"
          transition-hide="scale"
          no-caps
          text-color="primary"
          class="text-h6 q-ml-lg"
          dropdown-icon="false"
          :label="dropdownLabel"
        >
          <q-list v-for="(month, index) in months">
            <q-item
              clickable
              v-close-popup
              @click="selectMonth(month.value)"
              class="text-black text-h6"
              :value="month"
            >
              <q-item-section>
                <q-item-label>{{ month.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-btn-group>
    </div>
  </div>
</template>

<style scoped>
.schedule-item-border {
  border: 1px solid #ff0321;
  border-radius: 5px;
}
</style>
<script setup lang="ts">
import { monthsAux } from "./lib";

const emits = defineEmits(["reload", "prev", "next", "select-month"]);

const props = defineProps({
  date: {
    type: String,
    required: true,
    default: "",
  },
});

const months = ref(monthsAux);

function selectMonth(month: number) {
  emits("select-month", month);
}
</script>
