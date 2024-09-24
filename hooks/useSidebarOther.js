const SidebarMenuApiOther = [
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
        name: "Laporan Keuangan",
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
        name: "Sumber Penerimaan",
        url: "/kategori",
        icon: "ti ti-book",
        isOut: false,
      },
      {
        name: "Sub Kategori",
        url: "/sub-kategori",
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
];

export default SidebarMenuApiOther;
