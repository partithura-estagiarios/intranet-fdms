<template>
  <div class="row justify-between q-pa-md">
    <div>
      <q-btn
        class="bg-green text-white ml-12"
        :label="$t('text.addRamal')"
        @click="openDialog()"
      />
    </div>
    <q-input :label="$t('text.searchRamal')" v-model="search" color="indigo-8 ">
      <template v-slot:append>
        <q-icon
          name="search"
          color="indigo-8"
          @click="emits('ramal', search)"
          class="cursor-pointer"
        />
      </template>
    </q-input>
    <DialogAddRamal
      :open="dialogVisible"
      @close="(value) => (dialogVisible = value)"
    />
  </div>
</template>
<script setup lang="ts">
const dialogVisible = ref(false);
const emits = defineEmits(["ramal"]);
const search = ref();
function openDialog() {
  dialogVisible.value = true;
}
</script>
