// src/stores/bootstrap.store.ts
import { create } from 'zustand'

interface BootstrapState {
    ready: boolean
    setReady: () => void
}

export const useBootstrapStore = create<BootstrapState>((set) => ({
    ready: false,
    setReady: () => set({ ready: true })
}))
