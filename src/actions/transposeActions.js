import { TRANSPOSE_SONG } from "./types"

export const transposeSong = (songId, offset) => {
    return { type: TRANSPOSE_SONG, payload: {songId, offset} }
}
