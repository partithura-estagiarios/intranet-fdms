export function verifyFieldsRoom(room: {
  name?: string;
  color?: string;
}): boolean {
  if (!room.name) {
    return false;
  }
  if (!room.color) {
    return false;
  }
  return true;
}
