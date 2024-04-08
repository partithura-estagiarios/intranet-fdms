<template>
  <div class="q-px-md" v-for="(label, key) in props.objectInput" :key="key">
    <q-input
      rounded
      white
      standout="bg-grey-4 text"
      v-model="props.objectInput[key]"
      :label="$t('login.' + key)"
      :type="chooseVibility(key)"
    >
      <template v-slot:append>
        <q-icon
          v-show="verifyLabelPasswor(key)"
          color="grey"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
          :name="isPwdVisible"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
const isPwd = ref(true);
const isPwdVisible = computed(() => {
  return isPwd.value ? "visibility_off" : "visibility";
});

const emits = defineEmits(["dataLogin"]);
const props = defineProps({
  objectInput: {
    type: Object,
    default: () => ({}),
  },
});
function verifyLabelPasswor(label: string) {
  return label.includes("ss");
}

function chooseVibility(
  key: string,
):
  | "number"
  | "textarea"
  | "time"
  | "text"
  | "search"
  | "password"
  | "email"
  | "tel"
  | "file"
  | "url"
  | "date"
  | "datetime-local"
  | undefined {
  if (key !== "labelInputPassword" || !isPwd.value) {
    return "text";
  }
  return "password";
}
</script>
