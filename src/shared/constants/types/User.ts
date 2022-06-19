export interface User {
  _id: string;
  displayName: string;
  email: string;
  token: string;
  about?: string;
  linkGithub?: string;
  linkLinkedIn?: string;
  avatarImg?: string;
}
