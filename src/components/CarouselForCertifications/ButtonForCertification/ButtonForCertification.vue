<template>
  <div class="col-1 self-center">
    <q-btn
      flat
      :icon="props.icon"
      class="bg-indigo-8"
      color="white"
      rounded
      @click="navSlides()"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  direction: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["navigation"]);

function navSlides() {
  emits("navigation", props.direction);
}
</script>
