export default function handler(req, res) {
  const data = [
    { category: "PPh 21", value: 12000 },
    { category: "PPh 22", value: 18000 },
    { category: "PPh 23", value: 15000 },
    { category: "PPh 26", value: 20000 },
    { category: "PPN MASA", value: 10000 },
  ];

  res.status(200).json(data);
}
