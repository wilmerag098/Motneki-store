import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
    brand: string;
    status?: string;
}

interface StoreState {
    // UI State
    isCartOpen: boolean;
    isQuickViewOpen: boolean;
    quickViewProduct: any | null;
    toggleCart: () => void;
    openQuickView: (product: any) => void;
    closeQuickView: () => void;

    // Cart State
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartCount: () => number;

    // Wishlist State
    wishlist: number[]; // Array of Product IDs
    toggleWishlist: (id: number) => void;
    isInWishlist: (id: number) => boolean;
}

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            // UI State
            isCartOpen: false,
            isQuickViewOpen: false,
            quickViewProduct: null,
            toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
            openQuickView: (product) => set({ isQuickViewOpen: true, quickViewProduct: product }),
            closeQuickView: () => set({ isQuickViewOpen: false, quickViewProduct: null }),

            // Cart State
            cart: [],
            addToCart: (item) => set((state) => {
                const existingItem = state.cart.find((i) => i.id === item.id);
                if (existingItem) {
                    return {
                        cart: state.cart.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                        ),
                        isCartOpen: true // Open cart automatically when adding
                    };
                }
                return { cart: [...state.cart, item], isCartOpen: true };
            }),
            removeFromCart: (id) => set((state) => ({
                cart: state.cart.filter((i) => i.id !== id)
            })),
            updateQuantity: (id, quantity) => set((state) => ({
                cart: state.cart.map((i) =>
                    i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
                )
            })),
            clearCart: () => set({ cart: [] }),
            getCartTotal: () => {
                return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            },
            getCartCount: () => {
                return get().cart.reduce((count, item) => count + item.quantity, 0);
            },

            // Wishlist State
            wishlist: [],
            toggleWishlist: (id) => set((state) => ({
                wishlist: state.wishlist.includes(id)
                    ? state.wishlist.filter((wId) => wId !== id)
                    : [...state.wishlist, id]
            })),
            isInWishlist: (id) => get().wishlist.includes(id),
        }),
        {
            name: 'motneki-store', // key for localStorage
            partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }), // Only save cart & wishlist
        }
    )
);
