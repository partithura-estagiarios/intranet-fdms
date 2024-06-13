<template>
  <q-img src="/WELCOME_INTRANET.png" />
  <Separator :texto="$t('text.systems')" />
  <Item sistema="gestao" class="position-systems relative-position" />
</template>
<style scoped>
.position-systems {
  bottom: 6rem;
}
</style>
