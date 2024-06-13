<template>
  <q-btn
    color="white"
    icon="settings"
    flat
    size="1.5rem"
    @click="card = !card"
  />
  <q-card class="my-card bordered-card" v-show="card">
    <q-card-actions vertical>
      <q-item
        class="q-px-sm"
        clickable
        @click="userStorage.logout()"
        v-close-popup
      >
        <q-icon
          name="power_settings_new"
          size="1.6rem"
          class="q-py-xs q-px-sm"
          :color="iconColor"
        />
        <div class="custom-font q-py-xs text-no-wrap" :class="textColor">
          <q-item-section>{{ $t(`${text}`) }}</q-item-section>
        </div>
      </q-item>
    </q-card-actions>
  </q-card>
  <div class="border-custom-card" :class="borderColor" v-show="card"></div>
  <div class="second-border-custom-card" v-show="card"></div>
</template>

<script setup lang="ts">
import { useUsers } from "../../../stores";
const userStorage = useUsers();
const text = ref("");
const card = ref(false);
const textColor = ref("");
const borderColor = ref("");
const iconColor = ref("");

function updateColors() {
  if (userStorage.getToken) {
    text.value = "action.logout";
    borderColor.value = "bg-red";
    textColor.value = "text-red";
    return (iconColor.value = "red");
  }
  text.value = "action.login";
  borderColor.value = "bg-indigo";
  textColor.value = "text-indigo";
  return (iconColor.value = "indigo-5");
}

watchEffect(() => {
  updateColors();
});
</script>
<style scoped>
.my-card {
  top: 4.7rem;
  position: absolute;
  right: 0.8rem;
  width: 10.4rem;
  z-index: 1000 !important;
  clip-path: polygon(
    80.5% 0,
    85% 14%,
    100% 14%,
    100% 100%,
    0 100%,
    0 15%,
    76% 14%
  );

  height: 4rem;
}
.border-custom-card {
  top: 4.4rem;
  right: 0.6rem;
  width: calc(100% + 5.2rem);
  height: calc(100% - 1.35rem);
  position: absolute;
  z-index: 999;
  clip-path: polygon(
    79.5% 0,
    84% 14%,
    100% 14%,
    100% 100%,
    0 100%,
    0 15%,
    75% 14%
  );
}
.second-border-custom-card {
  top: 4.2rem;
  right: 0.5rem;
  width: calc(100% + 5.7rem);
  height: calc(100% + -1rem);
  position: absolute;
  z-index: 998;
  clip-path: polygon(
    79.9% 0,
    85% 13%,
    100% 14%,
    100% 100%,
    2% 100%,
    2% 15%,
    75% 14%
  );

  background-color: white;
}

.custom-font {
  font-family: Fira Sans;
  font-size: 1.05rem;
}
</style>
