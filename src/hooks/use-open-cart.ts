import create from 'zustand';

interface OpenCart {
    openCart: boolean;
    setOpenCart: (isOpen: boolean) => void;
    toggleCart: () => void;
}

// Zustand store for the openCart state
const useOpenCart = create<OpenCart>((set) => ({
    openCart: false, // Initial state
    setOpenCart: (isOpen: boolean) => set({ openCart: isOpen }),
    toggleCart: () => set((state) => ({ openCart: !state.openCart }))
}));

export default useOpenCart;
