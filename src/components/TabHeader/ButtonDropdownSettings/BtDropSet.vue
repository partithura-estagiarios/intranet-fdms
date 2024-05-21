<template>
  <q-btn-dropdown dropdown-icon="settings" size="1.7vh" flat color="white">
    <q-list
      class="bg-white q-px-none bottom"
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
          <q-item-label class="text-indigo-6">
            <q-icon v-show="page.name == 'login'" name="power_settings_new" />

            {{ $t("action." + page.name) }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
<script setup lang="ts">
import { item } from "./lib";
import { useUsers } from "../../../stores";
import { router } from "../../../modules";

function verifyTabs(tab: String) {
  if (tab == "logout") {
    const userStorage = useUsers();
    return userStorage.logout();
  }
  return router.push("/" + tab);
}
</script>
