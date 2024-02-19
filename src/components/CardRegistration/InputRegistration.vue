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
          :name="pwdIconName"
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
    required: true,
  },
});

const inputValues = ref(Array(props.objectInput.length).fill(""));

const pwdIconName = computed(() => {
  return isPwdvisible.value ? "visibility_off" : "visibility";
});

function verifyText(item: String) {
  return item.includes("ss");
}
</script>
