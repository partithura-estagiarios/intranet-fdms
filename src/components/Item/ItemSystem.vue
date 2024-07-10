<template>
  <div class="row justify-center">
    <q-item clickable @click="modalCreateSystem">
      <q-item-section class="border-radius-inherit">
        <q-avatar class="border-color row bg-white shadow-14" size="7.99rem">
          <q-icon
            :name="item.icon"
            class="custom-color icon-partithura q-py-md"
          />
        </q-avatar>
      </q-item-section>
      <div class="label text-start row">
        <q-item>
          <q-item-section>
            <q-item-label
              class="custom-color text-h5 text-weight-bolder font-custom"
            >
              {{ $t(`${item.label}`) }}
            </q-item-label>

            <q-item-label class="text-green text-bold text-h5 font-custom">
              {{ $t(`${item.subLabel}`) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <MenuSystemOptions
        @receveid="$emit('receveid')"
        @activeDeleteSystem="changeItem((change = !change))"
      />
    </q-item>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["activeBadgeExclusion", "receveid"]);
const modalCreateSystem = ref();
const change = ref(false);
const editItem = {
  icon: "more_vert",
  label: "action.systemManager",
  subLabel: "action.systemModuleOptions",
};
const newItem = {
  icon: "delete",
  label: "action.deleteSystem",
  subLabel: "",
};
const item = ref(editItem);

function changeItem(val: boolean) {
  if (val) {
    emits("activeBadgeExclusion");
    return (item.value = newItem);
  }
  emits("activeBadgeExclusion");
  return (item.value = editItem);
}
</script>

<style scoped>
.border-color {
  border: 8px solid rgb(31, 73, 125);
}
.custom-color {
  color: rgb(31, 73, 125);
}
.font-custom {
  font-family: Fira Sans;
}
.icon-partithura {
  height: 5.7rem;
  bottom: 0.35rem;
}
</style>
