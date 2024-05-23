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
        class="relative-position q-py-xs position-custom"
        clickable
        @click="userStorage.logout()"
        v-close-popup
      >
        <q-icon
          name="power_settings_new"
          size="sm"
          class="q-px-sm q-py-xs"
          :color="iconColor"
        />
        <div class="text-container custom-font q-py-xs" :class="textColor">
          <q-item-section>{{ $t(`${text}`) }}</q-item-section>
        </div>
      </q-item>
    </q-card-actions>
  </q-card>
  <div class="my-card2" :class="borderColor" v-show="card"></div>
  <div class="my-card3" v-show="card"></div>
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
  top: 5.8vh;
  position: absolute;
  left: -9.3vh;
  width: 16.2vh;
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

  height: 6.87vh;
}
.my-card2 {
  top: 5.6vh;
  left: -9.5vh;
  width: calc(100% + 9.3vh);
  height: calc(100% + 1vh);
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
.my-card3 {
  top: 5.2vh;
  left: -10.1vh;
  width: calc(100% + 10vh);
  height: calc(100% + 1.71vh);
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
.position-custom {
  top: 1vh;
  left: -0.5vh;
}
.border-red {
  border-style: solid;
  height: 0.5vh;
}
.border-blue {
  border-style: solid;
  height: 0.5vh;
  flex-wrap: nowrap !important;
}
.custom-font {
  font-family: Fira Sans;
}
.text-container {
  white-space: nowrap;
}
</style>
