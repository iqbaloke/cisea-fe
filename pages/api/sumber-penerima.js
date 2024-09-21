export default function handler(req, res) {
  const data = [
    {
      sumber_penerimaan: "PPH 21",
      kota_kab: "10%",
      provinsi: "20%",
      pusat: "70%",
    },
    {
      sumber_penerimaan: "PPH 22",
      kota_kab: "15%",
      provinsi: "25%",
      pusat: "60%",
    },
    {
      sumber_penerimaan: "PPH 23",
      kota_kab: "5%",
      provinsi: "30%",
      pusat: "65%",
    },
    {
      sumber_penerimaan: "PPH 26",
      kota_kab: "8%",
      provinsi: "32%",
      pusat: "60%",
    },
    {
      sumber_penerimaan: "PPH 4(2)",
      kota_kab: "12%",
      provinsi: "28%",
      pusat: "60%",
    },
  ];

  res.status(200).json(data);
}
