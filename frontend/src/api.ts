import axios from 'axios';
import type { MallInfo, Product, Shop, Order } from './types';

const API_BASE = '/api';

export const api = {
  // Mall info and telemetry
  getMallInfo: async (): Promise<MallInfo> => {
    const res = await axios.get(`${API_BASE}/mall/info`);
    return res.data.data;
  },

  getTelemetry: async () => {
    const res = await axios.get(`${API_BASE}/mall/telemetry`);
    return res.data.telemetry;
  },

  // Shops
  getShops: async (category?: string, floor?: number): Promise<Shop[]> => {
    const params: any = {};
    if (category) params.category = category;
    if (floor) params.floor = floor;
    const res = await axios.get(`${API_BASE}/shops`, { params });
    return res.data.data;
  },

  getShopById: async (id: string): Promise<{ shop: Shop; products: Product[] }> => {
    const res = await axios.get(`${API_BASE}/shops/${id}`);
    return { shop: res.data.data, products: res.data.data.products };
  },

  // Products
  getProducts: async (filters: {
    category?: string;
    shopId?: string;
    floor?: number;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    featured?: boolean;
  } = {}): Promise<Product[]> => {
    const res = await axios.get(`${API_BASE}/products`, { params: filters });
    return res.data.data;
  },

  getProductById: async (id: string): Promise<{ product: Product; related: Product[] }> => {
    const res = await axios.get(`${API_BASE}/products/${id}`);
    return { product: res.data.data, related: res.data.related };
  },

  // Submit product review
  submitReview: async (productId: string, review: {
    userName: string;
    comment: string;
    rating: number;
    cyberAugmentation?: string;
  }) => {
    const res = await axios.post(`${API_BASE}/products/${productId}/reviews`, review);
    return res.data;
  },

  // Orders
  createOrder: async (orderData: {
    items: any[];
    recipientName: string;
    teleportCoordinates: string;
    deliveryMode: string;
  }): Promise<Order> => {
    const res = await axios.post(`${API_BASE}/orders`, orderData);
    return res.data.order;
  },

  getOrderById: async (id: string): Promise<Order> => {
    const res = await axios.get(`${API_BASE}/orders/${id}`);
    return res.data.data;
  },

  // AURA-9 AI Concierge
  askConcierge: async (message: string, previousMessages: any[] = []): Promise<{
    reply: string;
    recommendedProducts: Product[];
    timestamp: string;
  }> => {
    const res = await axios.post(`${API_BASE}/concierge/chat`, {
      message,
      previousMessages
    });
    return res.data;
  }
};
