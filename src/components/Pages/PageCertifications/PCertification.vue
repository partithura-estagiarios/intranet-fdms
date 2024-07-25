<template>
  <Separator :texto="$t('tab.certifications')" class="no-margin no-padding" />
  <div
    class="row"
    :class="$q.screen.lt.lg ? 'justify-between' : 'justify-center q-py-sm'"
  >
    >
    <CardCertifications />
  </div>
</template>
