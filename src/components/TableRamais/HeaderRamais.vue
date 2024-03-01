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
      @add-ramal="(item) => (receivedRamal = item)"
    />
  </div>
</template>
<script setup lang="ts">
const dialogVisible = ref(false);
const emits = defineEmits(["ramal", "envityRamal-table"]);
const search = ref();
const receivedRamal = ref();
watchEffect(() => {
  if (receivedRamal) {
    emits("envityRamal-table", receivedRamal);
  }
});
function openDialog() {
  dialogVisible.value = true;
}
</script>
