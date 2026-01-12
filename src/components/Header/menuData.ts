import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Inicio",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Servicios",
    newTab: false,
    path: "/shop-with-sidebar",
  },
  {
    id: 3,
    title: "Contacto",
    newTab: false,
    path: "/contact",
  },
  {
    id: 6,
    title: "Páginas",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 61,
        title: "Tienda (Sidebar)",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 62,
        title: "Tienda (Full)",
        newTab: false,
        path: "/shop-without-sidebar",
      },
      {
        id: 64,
        title: "Checkout",
        newTab: false,
        path: "/checkout",
      },
      {
        id: 65,
        title: "Carrito",
        newTab: false,
        path: "/cart",
      },
      {
        id: 66,
        title: "Lista de Deseos",
        newTab: false,
        path: "/wishlist",
      },
      {
        id: 67,
        title: "Ingresar",
        newTab: false,
        path: "/signin",
      },
      {
        id: 68,
        title: "Registrarse",
        newTab: false,
        path: "/signup",
      },
      {
        id: 69,
        title: "Mi Cuenta",
        newTab: false,
        path: "/my-account",
      },
      {
        id: 70,
        title: "Contacto",
        newTab: false,
        path: "/contact",
      },
    ],
  },
  {
    id: 7,
    title: "Blog",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 71,
        title: "Blog Grid Sidebar",
        newTab: false,
        path: "/blogs/blog-grid-with-sidebar",
      },
      {
        id: 72,
        title: "Blog Grid",
        newTab: false,
        path: "/blogs/blog-grid",
      },
      {
        id: 73,
        title: "Blog Detalles Sidebar",
        newTab: false,
        path: "/blogs/blog-details-with-sidebar",
      },
      {
        id: 74,
        title: "Blog Detalles",
        newTab: false,
        path: "/blogs/blog-details",
      },
    ],
  },
];
