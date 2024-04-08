<template>
  <q-dialog v-model="props.open" persistent>
    <q-responsive :ratio="16 / 9" style="width: 790px; max-width: 90%">
      <q-card>
        <q-card-section class="bg-indigo-8 row justify-between text-white">
          <div class="q-pa-md text-h5">{{ $t("text." + props.option) }}</div>
          <q-icon
            name="close"
            class="pt-2 cursor-pointer"
            size="45px"
            @click="emits('close', false)"
          />
        </q-card-section>
        <div v-if="props.option != 'deleteRamal'">
          <q-card-section>
            <q-input
              white
              v-model="labelDefinite.sector"
              :label="$t(`formRamal.nameOfRamal`)"
            />
          </q-card-section>

          <q-card-section class="row justify-between no-wrap overflow-hidden">
            <div class="pr-12 col-7">
              <q-input
                white
                class="no-padding"
                v-model="labelDefinite.number"
                :label="$t(`formRamal.numberOfRamal`)"
              />
            </div>
            <div class="pl-12 col-5">
              <q-input
                white
                v-model="labelDefinite.name"
                :label="$t(`formRamal.userOfRamal`)"
              />
            </div>
          </q-card-section>
        </div>
        <div v-else>
          <!-- <q-card-section>
            <span class="text-grey text-h6">
              {{
                $t("formRamal.deleteRamalMessage", {
                  numero: props.ramal.number,
                  nome: props.ramal.name,
                  setor: props.ramal.sector,
                })
              }}
            </span>
          </q-card-section> -->
        </div>
        <q-card-actions align="right" class="pt-12 pa-5 text-green-8">
          <!-- <q-btn
            flat
            :label="$t('formRamal.confirm')"
            @click="optionRamal(props.option, labelDefinite)"
          /> -->
        </q-card-actions>
      </q-card>
    </q-responsive>
  </q-dialog>
</template>

<script setup lang="ts">
import * as Mutation from "../../../graphql/ramais/mutations.gql";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  option: {
    type: String,
    required: true,
  },
  ramal: {
    type: Object,
    required: false,
  },
});
const emits = defineEmits(["close", "reloadTable"]);
const label = reactive({
  id: null,
  sector: "",
  number: "",
  name: "",
});
const labelDefinite = computed(() => {
  return props.ramal ?? label;
});

// async function optionRamal(option: string, ramal: Object) {
//   switch (props.option) {
//     case "deleteRamal":
//       await runMutation(Mutation.DeleteRamal, { id: ramal.id });
//       emits("close");
//       emits("reloadTable");
//       break;
//     case "editRamal":
//       await runMutation(Mutation.EditRamal, { ramal: ramal });
//       emits("close");
//       emits("reloadTable");
//       break;
//     case "addRamal":
//       await runMutation(Mutation.AddRamal, { newRamal: ramal });
//       emits("close");
//       emits("reloadTable");
//       break;
//     default:
//       emits("close");
//       emits("reloadTable");
//   }
//   emits("close");
//   emits("reloadTable");
// }
</script>
