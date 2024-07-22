<template>
  <div>
    <q-img src="/WELCOME_INTRANET.png" />
    <Separator :texto="$t('text.systems')" />
    <Item sistema="gestao" class="item-gestao" />
  </div>
</template>

<style scoped>
.item-gestao {
  margin-top: -6rem;
}
</style>
