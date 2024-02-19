<template>
  <q-img src="/INTRANET_FUNDIMISA.png" class="absolute opacity fixed-full" />

  <div class="column fixed-center">
    <div class="row">
      <q-card class="my-card q-pa-xl shadow-1 justify-center bordered">
        <q-card-section vertical class="q-gutter-md" align="center">
          <q-avatar rounded size="150px">
            <img src="ico_fundimisa.png" />
          </q-avatar>
          <p class="text-bold text-black text-h4">INTRANET FUNDIMISA</p>
        </q-card-section>
        <q-card-section vertical class="q-gutter-md" align="center">
          <h5 class="text-subtitle1 text-bold">
            {{ $t("login.enterYourCredentials") }}
          </h5>

          <q-form class="q-gutter-md">
            <Input :objectInput="data" />
          </q-form>
          <br />
          <a class="underline text-bold" color="blue">{{
            $t("login.iForgotMyPassword")
          }}</a>
        </q-card-section>
        <q-card-actions class="q-px-md">
          <q-btn
            color="green-8"
            size="lg"
            class="envy full-width relative-position"
            :label="$t('login.submitButton')"
            nelevated
            rounded
            to="/home"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { data } from "./lib";
</script>

<style scoped>
.underline {
  text-decoration: underline;
}
</style>
