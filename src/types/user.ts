import type { UserProfile } from './profile';

export interface LoginResponse {
  token: string;
  userId: number;
  isNewUser: boolean;
  profile: UserProfile;
}
