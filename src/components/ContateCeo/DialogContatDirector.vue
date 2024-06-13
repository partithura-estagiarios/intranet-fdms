<template>
  <div>
    <q-dialog v-model="props.open" persistent>
      <q-card>
        <q-form @submit.prevent.stop>
          <q-card-section
            class="custom-color font-custom row text-white justify-between"
          >
            <div class="q-pa-md text-h5">
              {{ $t("emailDirector.contactTheDirector") }}
            </div>
            <q-icon
              name="close"
              class="pt-2 cursor-pointer"
              size="45px"
              @click="$emit('close')"
            />
          </q-card-section>

          <q-card-section class="row justify-between no-wrap overflow-hidden">
            <div class="pr-12 col-7">
              <q-input
                class="no-padding"
                v-model="label.name"
                :label="$t(`emailDirector.name`)"
                type="text"
              />
            </div>
            <div class="pl-12 col-5">
              <q-input
                v-model.number="label.registration"
                :label="$t(`emailDirector.registration`)"
                type="number"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="label.email"
              :label="$t(`emailDirector.describeYourContact`)"
              type="textarea"
              :rules="[verifyEmail]"
            />
          </q-card-section>
          <q-card-section align="right">
            <q-btn
              flat
              :label="$t('emailDirector.save')"
              class="text-green font-custom"
              @click="sendEmail"
              type="submit"
            ></q-btn>
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["close"]);
import SendEmailForDirector from "../../graphql/emailDirector/SendEmailForDirector.gql";
import { LabelEmail } from "../../entities/emailDirector";
const { t } = useI18n();
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});
const initialLabel = {
  name: "",
  registration: null,
  email: "",
};

const label: LabelEmail = reactive({ ...initialLabel });
async function sendEmail() {
  if (!label.email) {
    return;
  }
  const result = await runMutation(SendEmailForDirector, {
    to: label.name,
    registration: label.registration ? label.registration : 0,
    body: label.email,
  });
  if (result) {
    emits("close");
    return positiveNotify(t("emailDirector.emailSucess"));
  }
  negativeNotify(t("emailDirector.emailError"));
}

function verifyEmail(val: string) {
  if (!val) {
    return t("emailDirector.writeSomething");
  }
  return !!val;
}
watchEffect(() => {
  if (props.open) {
    Object.assign(label, initialLabel);
  }
});
</script>
<style scoped>
.custom-color {
  background-color: rgb(31, 73, 125);
}
.font-custom {
  font-family: Fira Sans;
}
</style>
