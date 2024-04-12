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
              type="text"
            />
          </q-card-section>

          <q-card-section class="row justify-between no-wrap overflow-hidden">
            <div class="pr-12 col-7">
              <q-input
                white
                class="no-padding"
                v-model="labelDefinite.number"
                :label="$t(`formRamal.numberOfRamal`)"
                type="number"
              />
            </div>
            <div class="pl-12 col-5">
              <q-input
                white
                v-model="labelDefinite.name"
                :label="$t(`formRamal.userOfRamal`)"
                type="text"
              />
            </div>
          </q-card-section>
        </div>
        <div v-else>
          <q-card-section>
            <span class="text-grey text-h6">
              {{
                $t("formRamal.deleteRamalMessage", {
                  numero: labelDefinite.number,
                  nome: labelDefinite.name,
                  setor: labelDefinite.sector,
                })
              }}
            </span>
          </q-card-section>
        </div>
        <q-card-actions align="right" class="pt-12 pa-5 text-green-8">
          <q-btn flat :label="$t('formRamal.confirm')" @click="optionRamal()" />
        </q-card-actions>
      </q-card>
    </q-responsive>
  </q-dialog>
</template>

<script setup lang="ts">
import AddRamal from "../../../graphql/ramais/AddRamal.gql";
import DeleteRamal from "../../../graphql/ramais/DeleteRamal.gql";
import EditRamal from "../../../graphql/ramais/EditRamal.gql";

import { Ramal } from "../../../modules/graphql/graphql";
import { resetFields } from "./lib";

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
const { t } = useI18n();
const emits = defineEmits(["close"]);
const label = reactive({
  id: "",
  sector: "",
  number: "",
  name: "",
});
const labelDefinite = computed(() => {
  return props.ramal ?? label;
});

async function optionRamal() {
  let result;
  switch (props.option) {
    case "addRamal":
      const { id, ...newRamal } = labelDefinite.value;
      result = await runMutation(AddRamal, {
        newRamal: newRamal,
      });
      resetFields(labelDefinite.value);
      emits("close");
      break;
    case "editRamal":
      result = await runMutation(EditRamal, { ramal: labelDefinite.value });
      emits("close");

      break;
    case "deleteRamal":
      result = await runMutation(DeleteRamal, { id: labelDefinite.value.id });
      emits("close");
      break;
    default:
  }

  if (result) {
    return positiveNotify(t("sucessRamal." + props.option));
  }
  return negativeNotify(t("erroRamal." + props.option));
}
</script>
