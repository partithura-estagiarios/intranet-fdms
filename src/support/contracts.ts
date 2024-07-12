export enum StatusResponse {
  SUCCESS = "success",
  FAILURE = "failure",
  REPEAT = "repeat",
}

export enum StatusCreateMeeting {
  DATE_INVALID = "dateInvalid",
  DATE_CONFLICT = "dateConflict",
  SUCCESS = "reunionAccept",
}

export enum StatusCreateRoom {
  ROOM_ACCEPTED = "roomAccepted",
  ROOM_REPETED_COLOR = "existRoomColor",
  ROOM_REPETED_NAME = "existRoomName",
}
