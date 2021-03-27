export interface IApiResponseInfo {
  count: number;
  pages: number;
  next: null | string;
  prev: null | string;
}

export interface ILocation {
  name: string;
  url: string;
}

export interface ILocationEntity {
  id: string;
  name: string;
  type: string;
  dimension: string[];
  residents: string;
  url: string;
  created: string;
}

export interface ICharacterEntity {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: EGender;
  origin: ILocation;
  location: ILocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export enum EGender {
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'unknown'
}
