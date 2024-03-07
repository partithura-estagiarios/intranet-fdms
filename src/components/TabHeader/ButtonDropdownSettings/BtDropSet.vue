<template>
  <q-btn-dropdown color="white" flat size="xl" dropdown-icon="settings" round>
    <q-list class="bg-white-8" v-for="(page, index) in item" :key="index">
      <q-item clickable v-close-popup @click="verifyTabs(page.value)">
        <q-item-section>
          <q-item-label class="text-indigo-8 pt-4">{{
            $t("action." + page.name)
          }}</q-item-label>
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
