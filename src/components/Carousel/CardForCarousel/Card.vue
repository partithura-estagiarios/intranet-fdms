<template>
  <div v-for="(card, index) in cards" :key="index" class="col-4 q-pa-md">
    <q-card dark bordered class="my-card">
      <q-card-section>
        <div class="text-h6">
          Turno <strong>{{ card.turno }}</strong>
        </div>
      </q-card-section>
      <q-card-section>
        <q-avatar
          class="avatar"
          square
          size="50px"
          font-size="82px"
          color="white"
        />
        <q-avatar
          class="avatar"
          square
          size="50px"
          font-size="82px"
          color="white"
        />
        <q-avatar
          class="avatar"
          square
          size="50px"
          font-size="82px"
          color="white"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
const cards = [
  {
    turno: "N",
  },
  {
    turno: "I",
  },
  {
    turno: "II",
  },
];
</script>

<style scoped>
.my-card {
  border-radius: 30px;
  justify-content: center;
  margin-bottom: 10px; /* Added margin-bottom */
  width: 250px;
  background-color: rgba(
    190,
    191,
    196,
    0.5
  ); /* Altere 0.5 para ajustar a opacidade conforme necessário */
}
.avatar {
  border-radius: 30px;
  width: 100%;
  margin-bottom: 20px;
}
.text-h6 {
  font-size: xx-large;
}
</style>
