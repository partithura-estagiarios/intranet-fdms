<template>
  <div>
    <q-carousel v-model="slide" class="full-height bg-transparent">
      <q-carousel-slide
        :name="index"
        class="overflow-hidden row no-wrap justify-center"
        v-for="(item, index) in certifications"
      >
        <CardCertification
          v-if="index > 0"
          class="col-5 mt-12 card-left relative-position"
          :imgs-ex="(certifications[index - 1].image as string)"
          :title="certifications[index - 1].name as string"
        />
        <ButtonForCertification
          v-if="index > 0"
          direction="prev"
          icon="arrow_back"
          @navigation="(nav: string) => navSlides(nav)"
        />
        <CardCertification
          :imgs-ex="(item.image as string)"
          :title="(item.name as string)"
          class="col-5 relative-position"
        />
        <ButtonForCertification
          v-if="index < certifications.length - 1"
          direction="next"
          icon="arrow_back"
          class="flip-horizontal"
          @navigation="(nav: string) => navSlides(nav)"
        />
        <CardCertification
          v-if="index < certifications.length - 1"
          class="col-5 mt-12 card-right relative-position"
          :imgs-ex="(certifications[index + 1].image as string)"
          :title="(certifications[index + 1].name as string)"
        />
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup lang="ts">
import GetCertification from "../../graphql/certification/Certification.gql";
import { Certification } from "../../entities/certification";
const certifications = ref<Certification[]>([]);

onMounted(async () => {
  const getCertifications = await runQuery(GetCertification);

  if (Array.isArray(getCertifications.getCertifications)) {
    certifications.value = getCertifications.getCertifications.map(
      (certification: any) => {
        return {
          name: certification.name.toString(),
          image: certification.image.toString(),
        } as Certification;
      }
    );
  }
});
const slide = ref(0);

function navSlides(direction: string) {
  if (direction === "prev" && slide.value > 0) {
    return slide.value--;
  }
  return slide.value++;
}
</script>
