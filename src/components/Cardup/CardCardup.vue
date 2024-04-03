<template>
  <q-card class="my-card">
    <q-card-section :class="sectionClasses" class="text-white">
      <div class="text-h6">
        {{ props.day }}
        <q-icon name="notifications" v-if="props.day === 'idea'" />
      </div>
    </q-card-section>
    <q-card-actions
      vertical
      align="center"
      v-for="food in props.ingredients"
      class="text-indigo-8 text-h6"
    >
      <div>{{ food }}</div>
    </q-card-actions>
  </q-card>
</template>

<script setup>
const props = defineProps({
  day: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
});
const sectionClasses = computed(() => {
  return {
    "bg-indigo-8": props.day !== "idea",
    "bg-green": props.day === "idea",
  };
});
</script>
