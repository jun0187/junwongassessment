import { Dimensions } from "react-native";

export const DeviceWidth = Dimensions.get("window").width;
export const DeviceHeight = Dimensions.get("window").height;

export enum NAVIGATION {
  HOME = "HOME",
  DETAIL = "DETAIL",
  BOOK = "BOOK",
}

export enum IMAGE_URI {
  IMAGE = "https://image.tmdb.org/t/p/w500/{imageURI}",
  DEFAULT = "https://www.cathaycineplexes.com.sg/images/default-poster-small.png",
}

export enum API {
  API_KEY = "328c283cd27bd1877d9080ccb1604c91",
  API_PREFIX = "https://api.themoviedb.org/3",
  LISTING_API = API_PREFIX + "/discover/movie",
  DETAIL_API = API_PREFIX + "/movie/{movieId}",
}

export const movieSortList = [
  { id: "releaseDate", label: "Release Date" },
  { id: "alphabetical", label: "Alphabetical" },
  { id: "popularity", label: "Rating" },
];
