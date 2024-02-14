/* Instruments */
import type { ReduxState } from "@/store/redux";

export const selectImage = (state: ReduxState) => state.editCard.image;
