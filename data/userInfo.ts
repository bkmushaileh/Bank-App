interface LoggedUserInfo {
  username: string;
  password: string;
}

interface UserInfo extends LoggedUserInfo {
  username: string;
  password: string;
  image: string;
}

export { LoggedUserInfo, UserInfo };
