export enum KEY_CODE {
  BACKSPACE = 8,
  TAB = 9,
  ENTER = 13,
}

export enum ERROR_CODE {
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  UNAUTHENTICATED = 401,
}

export enum COMMENT_TYPE {
  QUESTION = 1,
  COMMENT = 2,
  REPLY = 3,
}

export enum COMMENT_ACTIONS {
  EDIT = 1,
  DELETE = 2,
}

export enum USER_ACTIONS {
  VIEW_PROFILE = 1,
  CHANGE_PASS = 2,
  LOG_OUT = 3,
}

export enum CONTENT_TYPE {
  QUESTION = 'questions',
  TAG = 'tags',
  ANSWER = 'answers',
  USER = 'users',
}

export enum USER_ROLE {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

export enum INPUT_BUTTON_ACTION {
  VIEW_USER = 'VIEW_USER',
  VIEW_QUESTION = 'VIEW_QUESTION',
  VIEW_USERS_LIKE = 'VIEW_USERS_LIKE',
  CHANGE_QUESTION = 'CHANGE_QUESTION',
  CHANGE_AVATAR = 'CHANGE_AVATAR',
  CHANGE_USER_ANSWER = 'CHANGE_USER_ANSWER',
  CHANGE_USER_QUESTION = 'CHANGE_USER_QUESTION',
}

export enum SEARCH_TYPE {
  USER = 1,
  QUESTION = 2,
}

export enum USER_FOR {
  ANSWER = 'ANSWER',
  QUESTION = 'QUESTION',
}

export enum DIALOG_SIZE {
  SM = 0,
  MD = 1,
  LG = 2,
}
