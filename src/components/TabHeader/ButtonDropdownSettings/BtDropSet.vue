<template>
  <q-btn icon="settings" flat size="xl" @click="toggleDropdown">
    <q-menu>
      <q-list
        class="bg-white-8 q-px-none bottom"
        v-for="(page, index) in item"
        :key="index"
      >
        <q-item
          clickable
          v-close-popup
          class="q-px-none"
          @click="verifyTabs(page.value)"
        >
          <q-item-section>
            <q-item-label class="text-indigo-8">
              <q-icon v-show="page.name == 'login'" name="power_settings_new" />

              {{ $t("action." + page.name) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script setup lang="ts">
import { item } from "./lib";
import { useUsers } from "../../../stores";
import { router } from "../../../modules";

const on = ref(false);

function verifyTabs(tab: String) {
  if (tab == "logout") {
    const userStorage = useUsers();
    return userStorage.logout();
  }
  return router.push("/" + tab);
}
const showList = computed(() => {
  return on.value;
});

function toggleDropdown() {
  on.value = !on.value;
}
</script>
