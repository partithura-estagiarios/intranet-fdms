<template>
  <q-btn
    class="text-white font-custom"
    no-caps
    :label="$t('tab.gisDocumentation')"
    flat
    :class="tabClass()"
  >
    <q-menu class="z-top text-black">
      <q-list>
        <q-item
          clickable
          v-close-popup
          v-for="opt in options"
          :key="opt"
          @click="selectOption(opt)"
        >
          <q-item-section>
            <q-item-label>{{ removeCharacterSpecial(opt) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { useSystems } from "../../../stores/system";
import { useRoute } from "vue-router";

const { t } = useI18n();
const route = useRoute();
const options = ["/processes", "/institutional"];
const systemStorage = useSystems();

function removeCharacterSpecial(rout: string) {
  const parts = rout.split("/");
  return t(`tab.${parts.join("")}`);
}

function tabClass() {
  if (options.includes(route.fullPath)) {
    return "text-green bg-white rounded-borders";
  }
}
function selectOption(opt: string) {
  systemStorage.goToRoute(opt);
}
</script>

<style scoped>
.font-custom {
  font-family: Fira Sans;
  font-size: 1.3rem;
}
</style>
