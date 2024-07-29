<template>
  <q-dialog v-model="props.addRoom">
    <q-card>
      <DialogHeader option="action.addRoom" @close="handleClose" />
      <CreateRoomSection @envityRoom="(val) => (newRoom = val)" />
      <CardButtonConfirm @confirm="handleConfirm" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { verifyFieldsRoom } from "./lib";
import AddRoom from "../../../graphql/rooms/AddRoom.gql";
import { StatusCreateRoom } from "../../../support/contracts";
const { t } = useI18n();
const emits = defineEmits(["close", "reload"]);
const props = defineProps({
  addRoom: {
    type: Boolean,
    required: true,
  },
});
const newRoom = ref({});
const enableModal = ref();
function handleClose() {
  enableModal.value = false;
  emits("close");
}
watchEffect(() => {
  if (props.addRoom) {
    enableModal.value = props.addRoom;
  }
});
const notifyUser = (message: string, type: string) => {
  if (type === StatusCreateRoom.ROOM_ACCEPTED) {
    return positiveNotify(message);
  }
  if (type === StatusCreateRoom.ROOM_REPETED_COLOR) {
    return negativeNotify(message);
  }
  negativeNotify(message);
};
async function handleConfirm() {
  if (verifyFieldsRoom(newRoom.value)) {
    const { addRoom }: { addRoom: string } = await runMutation(AddRoom, {
      room: newRoom.value,
    });
    notifyUser(t(`action.${addRoom}`), addRoom);
    return emits("reload");
  }
  negativeNotify(t("action.enterNameRoom"));
}
</script>
