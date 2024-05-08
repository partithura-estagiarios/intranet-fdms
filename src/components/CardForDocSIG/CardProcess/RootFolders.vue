<template>
  <q-card-section>
    <q-virtual-scroll
      class="maximum-scroll"
      :items="props.folderTree"
      v-slot="{ item, index }"
    >
      <div class="q-pt-md">
        <q-item
          clickable
          v-ripple
          @click="handleItemClick(index, item.folderNow)"
          :class="folderClass(index)"
        >
          <q-item-section :class="textClass(index)">{{
            item.folderNow
          }}</q-item-section>
        </q-item>
      </div>
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
const firstPosition = 0;
const folderClass = computed(() => {
  return (index: number) => ({
    "bg-green": activeButtonIndex.value === index,
  });
});

const handleItemClick = (index: number, name: string) => {
  activeButtonIndex.value = index;
  emits("selectFolderTree", name);
};
onBeforeUpdate(() => {
  activeButtonIndex.value = null;
});
</script>

<style scoped>
.maximum-scroll {
  max-height: 75vh;
  width: 10vw;
}
</style>
