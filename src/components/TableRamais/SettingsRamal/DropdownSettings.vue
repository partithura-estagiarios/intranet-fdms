<template>
  <q-btn color="primary" flat icon="settings">
    <q-menu anchor="top left" self="bottom left">
      <q-list style="min-width: 100px" v-for="item in props.options">
        <q-item clickable @click="openDialog(item as String)">
          <q-item-section>{{ $t("text." + item) }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
  <DialogAddRamal
    :open="dialogVisible"
    :option="selectOption"
    @close="(value) => (dialogVisible = value)"
    :ramal="ramalForEdition"
    @reloadTable="attTable"
  >
  </DialogAddRamal>
</template>

<script setup lang="ts">
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  ramal: {
    type: Object,
    required: false,
  },
});
const emits = defineEmits(["envityRamalCustom", "reload"]);

function attTable() {
  emits("reload");
}
const selectOption = ref();
const dialogVisible = ref(false);
const ramalForEdition = ref();
function openDialog(option: String) {
  console.log(option);
  dialogVisible.value = true;
  selectOption.value = option;
  ramalForEdition.value = props.ramal;
}
</script>
