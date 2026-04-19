import { useCartStore, CartItem } from '@/stores/cartStore';
import { toast } from 'react-toastify';

export function useCart() {
  const store = useCartStore();

  const addToCart = (item: CartItem) => {
    if (!item.size) {
      toast.error('사이즈를 선택해주세요.');
      return false;
    }
    store.addItem(item);
    toast.success('장바구니에 담겼습니다.');
    return true;
  };

  const removeFromCart = (productId: number, size?: string, color?: string) => {
    store.removeItem(productId, size, color);
  };

  return {
    items: store.items,
    totalCount: store.totalCount(),
    totalPrice: store.totalPrice(),
    addToCart,
    removeFromCart,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
  };
}
