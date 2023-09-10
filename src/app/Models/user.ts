export interface IUserData {
  info: Object;
  results: IUser[];
}

export interface IUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
  };
  location: {
    city: string;
    country: string;
    state: string;
    coordinates: {
      latitude: string,
      longitude: string,
    }
  };
}
