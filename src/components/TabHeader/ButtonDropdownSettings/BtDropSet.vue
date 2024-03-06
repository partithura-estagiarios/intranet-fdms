<template>
  <q-btn icon="settings" flat size="xl" @click="toggleDropdown" />

  <div class="dropdown-content fixed-right" v-show="showList">
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
  </div>
</template>
<script setup lang="ts">
import { item } from "./lib";
import { useUsers } from "../../../stores";
import { router } from "../../../modules";

const on_off = ref(false);

function verifyTabs(tab: String) {
  if (tab == "logout") {
    const userStorage = useUsers();
    return userStorage.logout();
  }
  return router.push("/" + tab);
}
const showList = computed(() => {
  return on_off.value;
});

function toggleDropdown() {
  on_off.value = !on_off.value;
}
</script>
<style scoped>
.dropdown-content {
  background-color: white;
  clip-path: polygon(
    70% 15%,
    88% 18%,
    100% 18%,
    100% 50%,
    0 50%,
    0 18%,
    50% 18%
  );
  bottom: 55%;
  border: solid rgba(30, 98, 193, 0.549);
  border-top: solid rgba(30, 98, 193, 0.549);
  border-bottom: solid rgba(30, 98, 193, 0.549);
}
.bottom {
  position: relative;
  bottom: -80px;
}
</style>
