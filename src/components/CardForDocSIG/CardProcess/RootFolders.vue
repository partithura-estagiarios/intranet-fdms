<template>
  <q-card-section>
    <q-virtual-scroll
      class="maximum-scroll"
      :items="props.folderTree"
      v-slot="{ item, index }"
    >
      <q-item
        clickable
        v-ripple
        @click="handleItemClick(index, item.name)"
        :class="folderClass(index)"
      >
        <q-item-section :class="textClass(index)">{{
          item.name
        }}</q-item-section>
      </q-item>
    </q-virtual-scroll>
  </q-card-section>
</template>

<script setup lang="ts">
const props = defineProps({
  folderTree: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(["selectFolderTree"]);
const activeButtonIndex = ref<null | number>(null);
const textClass = computed(() => {
  return (index: number) => ({
    "text-white": activeButtonIndex.value === index,
  });
});

const folderClass = computed(() => {
  return (index: number) => ({
    "bg-green": activeButtonIndex.value === index,
  });
});

const handleItemClick = (index: number, name: string) => {
  activeButtonIndex.value = index;
  emits("selectFolderTree", index, name);
};
</script>

<style scoped>
.maximum-scroll {
  max-height: 75vh;
  width: 10vw;
}
</style>
