import { create } from "zustand";

interface UiState {
isLoading: boolean;
setLoading: (status: boolean) => void;
isError: string | null;
setError: (message: string | null) => void;
}

export const UseUiStore = create<UiState>((set) => ({
    isLoading: false,
    isError: null,
    setLoading: (status) => set({ isLoading: status }),
    setError: (message) => set({ isError: message }),
}));