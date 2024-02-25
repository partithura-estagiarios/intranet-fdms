<template>
  <div class="q-px-md" v-for="(label, key) in props.objectInput" :key="key">
    <q-input
      rounded
      white
      standout="bg-grey-4 text"
      v-model="props.objectInput[key]"
      :label="$t('login.' + key)"
      :type="isPwdvisible ? 'password' : 'text'"
    >
      <template v-slot:append>
        <q-icon
          v-show="verifyLabelPasswor(key)"
          color="grey"
          class="cursor-pointer"
          @click="isPwdvisible = !isPwdvisible"
          :name="isPwdvisible ? 'visibility_off' : 'visibility'"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
const isPwdvisible = ref(false);
const emits = defineEmits(["dataLogin"]);
const props = defineProps({
  objectInput: {
    type: Object,
    default: () => ({}),
  },
});
function verifyLabelPasswor(label: string) {
  if (label.includes("ss")) {
    return true;
  }
}
</script>
