// type FeaturedPlaylist = {
//     images:string,
//     title:string,
//     description:string
// }
export interface Store {
  token: string;
  featuredPlaylist: any;
  searchResult: any;
  playerState: boolean;
}
