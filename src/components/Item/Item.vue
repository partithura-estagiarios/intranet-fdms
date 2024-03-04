<template>
  <div class="row justify-center">
    <div v-for="item in sistemas">
      <q-item>
        <q-item-section class="border-radius-inherit">
          <q-avatar class="border row" size="6em">
            <q-icon
              :name="item.icon"
              color="indigo-7"
              size="50px"
              class="q-gutter-x-ls q-gutter-y-sm"
            />
          </q-avatar>
        </q-item-section>
        <div class="label text-start row">
          <q-item>
            <q-item-section>
              <q-item-label class="text-indigo-8 text-h6 text-weight-bolder">
                {{ item.label }}
              </q-item-label>

              <q-item-label class="text-indigo text-h6">
                {{ item.sublabel }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoadSystems from "../../graphql/system/queries.gql";
const props = defineProps({
  sistema: {
    type: String!,
    required: true,
  },
});
const sistemas: System = ref([]);

onMounted(async () => {
  const { loadSystems } = await runQuery(LoadSystems, {
    sistema: props.sistema,
  });
  sistemas.value = getSystem;
});
</script>

<style scoped>
.border {
  border: 5px solid rgb(34, 34, 199);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
