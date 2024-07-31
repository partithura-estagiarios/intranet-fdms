<template>
  <q-list class="rounded-borders text-white bg-green" v-for="item in items">
    <q-item
      clickable
      v-ripple
      :class="getItemClass(item)"
      @click="selectItem(item)"
    >
      <q-item-section>{{ $t(`label.${item}`) }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
const items = ["month", "year", "week"];
const emits = defineEmits(["changeSchedule"]);
const selectedItem = ref<string | null>("month");

function selectItem(item: string) {
  selectedItem.value = item;
  emits("changeSchedule", item);
}

const getItemClass = (item: string) => {
  return selectedItem.value === item ? "my-menu-link" : "";
};
</script>

<style scoped>
.my-menu-link {
  color: white;
  background-color: rgb(31, 73, 125);
}
</style>
