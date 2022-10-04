import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavMusic {
  id: any;
}

interface InitialState {
  albums: any;
  favMusic: FavMusic[];
  showFav: boolean;
}
const initialState: InitialState = {
  albums: [],
  favMusic: [],
  showFav: false,
};

export const albumSlice = createSlice({
  name: "musicAlbum",
  initialState,
  reducers: {
    setAlbums: (state, action) => {
      const albums = action.payload;
      const favIds: string[] = [];
      state.favMusic.forEach((item: any) => favIds.push(item.id));
      const updatedAlbum = albums.map((item: any) => {
        return favIds.includes(item.id)
          ? { ...item, isFav: true }
          : { ...item, isFav: false };
      });
      state.albums = updatedAlbum;
    },

    updateAlbum: (state, action) => {
      const updated = {
        ...action.payload,
        isFav: true,
      };
      const updateList = state.albums.map((list: any) =>
        list.id === action.payload.id ? updated : list
      );
      state.albums = updateList;

      const updateFavList = state.favMusic.map((list: any) =>
        list.id === action.payload.id ? updated : list
      );
      state.favMusic = updateFavList;
    },

    addFav: (state, action) => {
      const arr = [...state.favMusic];
      arr.push(action.payload);
      state.favMusic = [...new Set(arr)];

      const updateList = state.albums.map((list: any) =>
        list.id === action.payload.id ? action.payload : list
      );
      state.albums = updateList;
    },

    removeFav: (state, action) => {
      const changeFav = state.albums.find(
        (list: any) => list.id === action.payload.id
      );
      const updated = { ...changeFav, isFav: false };
      state.albums = state.albums.map((list: any) =>
        list.id === action.payload.id ? updated : list
      );
      state.favMusic = state.favMusic.filter(
        (li) => li.id !== action.payload.id
      );
    },

    showFav: (state, action: PayloadAction<boolean>) => {
      state.showFav = !state.showFav;
    },
  },
});

export const { setAlbums, updateAlbum, addFav, removeFav, showFav } =
  albumSlice.actions;

export default albumSlice.reducer;
