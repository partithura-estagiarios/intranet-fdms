<template>
  <q-list :class="{ 'max-size-list': isScrollableList }">
    <q-item
      clickable
      v-for="name in foldersName"
      :key="name"
      class="text-no-wrap q-py-lg"
      :class="itemClasses(name)"
      @click="selectItem(name)"
    >
      {{ name }}
      <q-icon
        name="delete"
        size="sm"
        v-if="userStorage.getToken"
        class="cursor-pointer"
        @click.stop="excludeFolderInt(name)"
      />
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { useUsers } from "../../../stores/user";
import { useImgs } from "../../../stores/imgs";

const userStorage = useUsers();
const imgsStorage = useImgs();
const emits = defineEmits(["envity-name"]);
const selectedItem = ref<string | null>(null);

const props = defineProps({
  foldersName: {
    type: Array as () => string[],
    required: true,
  },
});

const itemClasses = computed(() => {
  return (name: string) => {
    const isSelected = selectedItem.value === name;
    if (isSelected) {
      return "bg-green text-white";
    }
    return "text-black";
  };
});

function selectItem(name: string) {
  selectedItem.value = name;
  emits("envity-name", name);
}

function excludeFolderInt(item: string) {
  imgsStorage.excludeFolder(item);
}

const isScrollableList = computed(() => {
  const maxHeight = 43;
  const listItemHeight = 5;
  const totalListHeight = props.foldersName.length * listItemHeight;

  return totalListHeight > maxHeight;
});
</script>

<style scoped>
.max-size-list {
  max-height: 39rem;
  overflow-y: scroll;
}
</style>
