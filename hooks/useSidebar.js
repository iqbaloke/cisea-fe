const SidebarMenuApi = [
  {
    id: 1,
    name: "",
    type: "main_menu",
    data: [
      {
        name: "Dashboard",
        url: "/",
        icon: "ti ti-dashboard",
        isOut: false,
      },
    ],
  },

  {
    id: 2,
    name: "Transaksi",
    type: "main_menu",
    data: [
      {
        name: "Sumber Penerimaan",
        url: "/sumber-penerimaan",
        icon: "ti ti-bookmark",
        isOut: false,
      },
    ],
  },
  {
    id: 3,
    name: "Master Data",
    type: "main_menu",
    data: [
      {
        name: "Kategori Setoran",
        url: "/kategori",
        icon: "ti ti-book",
        isOut: false,
      },
      {
        name: "Sub Kategori",
        url: "/kategori",
        icon: "ti ti-book",
        isOut: false,
      },
      {
        name: "Wilayah",
        url: "/wilayah",
        icon: "ti ti-location",
        isOut: false,
      },
    ],
  },
  {
    id: 4,
    name: "Manajemen User",
    type: "main_menu",
    data: [
      {
        name: "User",
        url: "/user",
        icon: "ti ti-user",
        isOut: false,
      },
    ],
  },
];

export default SidebarMenuApi;
