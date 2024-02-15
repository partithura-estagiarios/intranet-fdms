<template>
  <div v-for="(item, index) in props.objectInput" :key="index">
    <q-input
      rounded
      white
      standout="bg-grey-4 "
      v-model="inputValues[index]"
      :label="$t(`register.${item}`)"
    >
      <template v-slot:append>
        <q-icon
          v-show="verifyText(item as string)"
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
const isPwdvisible = ref(true);

const props = defineProps({
  objectInput: {
    type: Array,
    default: [],
  },
});
function verifyText(item: String) {
  if (item.includes("ss")) {
    return true;
  }
  return false;
}
const inputValues = ref(Array(props.objectInput.length).fill(""));
</script>
