<template>
  <q-list
    v-for="(item, index) in filteredInstitutional"
    :key="index"
    class="text-indigo-8"
  >
    <q-item
      clickable
      @click="setLink(item)"
      :class="{ 'text-white bg-green rounded-borders': link === item.name }"
    >
      <q-item-section>{{ $t(`cardDocSig.${item.label}`) }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
const props = defineProps({
  tabSelect: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["showImage"]);
const link = ref("");

const setLink = (item: Object) => {
  link.value = item.name;
  emits("showImage", link.value);
};
const institutional = [
  { name: "1", label: "integratedPolicy" },
  { name: "2", label: "missionVisionBusiness" },
  { name: "3", label: "principles" },
  { name: "4", label: "codeofEthics" },
  { name: "5", label: "disciplinaryPractices" },
  { name: "6", label: "representatives" },
  { name: "7", label: "policyforSexualHarassment" },
  { name: "8", label: "socialPolicyforDiversity" },
  { name: "9", label: "environmentalObjectsandGoals" },
  { name: "10", label: "environmentalCommitments" },
];
const fispq = [
  { name: "", label: "" },
  { name: "", label: "" },
  { name: "", label: "" },
  { name: "", label: "" },
  { name: "", label: "" },
  { name: "", label: "" },
  { name: "", label: "" },
  { name: "", label: "" },
  { name: "", label: "" },
  { name: "", label: "" },
];
const filteredInstitutional = computed(() => {
  if (props.tabSelect === "institutional") {
    return institutional;
  }
});
</script>
