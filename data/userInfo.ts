interface LoggedUserInfo {
  username: string;
  password: string;
}

interface UserInfo extends LoggedUserInfo {
  username: string;
  password: string;
  image: string;
}
// me
interface UserProfile {
  username: string;
  image: string;
  balance?: number;
}
export { LoggedUserInfo, UserInfo, UserProfile };
