<template>
  <div>
    <q-dialog v-model="props.open" persistent>
      <q-card>
        <q-form>
          <q-card-section class="bg-indigo-8 row justify-between text-white">
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
                v-model="label.registration"
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
              class="text-indigo-8"
              @click="sendEmail"
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
const { t } = useI18n();
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});
const label = reactive({
  name: "",
  registration: "",
  email: "",
});
async function sendEmail() {
  if (!label.email.trim()) {
    return;
  }
  const result = await runMutation(SendEmailForDirector, {
    to: label.name,
    registration: label.registration,
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
  return true;
}
watchEffect(() => {
  if (props.open) {
    label.name = "";
    label.registration = "";
    label.email = "";
  }
});
</script>
