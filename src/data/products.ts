import briefcaseImg from "@/assets/product-briefcase.jpg";
import suitcaseImg from "@/assets/product-suitcase.jpg";
import laptopBagImg from "@/assets/product-laptop-bag.jpg";
import duffleImg from "@/assets/product-duffle.jpg";
import backpackImg from "@/assets/product-backpack.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Executive Leather Briefcase",
    price: 12999,
    image: briefcaseImg,
    category: "Briefcases",
    isNew: true,
    isBestseller: true,
  },
  {
    id: "2",
    name: "Voyager Hardshell Suitcase",
    price: 18499,
    originalPrice: 22999,
    image: suitcaseImg,
    category: "Suitcases",
    isBestseller: true,
  },
  {
    id: "3",
    name: "Cambridge Laptop Bag",
    price: 8999,
    image: laptopBagImg,
    category: "Laptop Bags",
    isNew: true,
  },
  {
    id: "4",
    name: "Heritage Weekender Duffle",
    price: 15999,
    image: duffleImg,
    category: "Travel Bags",
    isBestseller: true,
  },
  {
    id: "5",
    name: "Urban Pro Backpack",
    price: 9499,
    originalPrice: 11999,
    image: backpackImg,
    category: "Backpacks",
    isBestseller: true,
  },
  {
    id: "6",
    name: "Classic Leather Satchel",
    price: 7999,
    image: laptopBagImg,
    category: "Laptop Bags",
  },
  {
    id: "7",
    name: "Premium Carry-On Spinner",
    price: 16999,
    image: suitcaseImg,
    category: "Suitcases",
    isNew: true,
  },
  {
    id: "8",
    name: "Professional Document Bag",
    price: 10999,
    image: briefcaseImg,
    category: "Briefcases",
  },
  {
    id: "9",
    name: "Adventure Travel Backpack",
    price: 11499,
    image: backpackImg,
    category: "Backpacks",
  },
  {
    id: "10",
    name: "Luxury Leather Duffle",
    price: 19999,
    originalPrice: 24999,
    image: duffleImg,
    category: "Travel Bags",
    isBestseller: true,
  },
  {
    id: "11",
    name: "Compact Business Suitcase",
    price: 14999,
    image: suitcaseImg,
    category: "Suitcases",
  },
  {
    id: "12",
    name: "Slim Laptop Sleeve Bag",
    price: 5999,
    image: laptopBagImg,
    category: "Laptop Bags",
    isNew: true,
  },
];

export const categories = [
  "Suitcases",
  "Briefcases",
  "Backpacks",
  "Travel Bags",
  "Laptop Bags",
];
