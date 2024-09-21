export default function handler(req, res) {
  const data = [
    { id: 1, jenis: "PPh 21 Pegawai", penerima_pajak_id: 1 },
    { id: 2, jenis: "PPh 22 (Pot Put)", penerima_pajak_id: 1 },
    { id: 3, jenis: "PPh 23 (Pot Put)", penerima_pajak_id: 1 },
    { id: 4, jenis: "PPh 26 (Pot Put)", penerima_pajak_id: 1 },
    { id: 5, jenis: "PPh 4(2) (Pot Put)", penerima_pajak_id: 1 },
    { id: 6, jenis: "PPh 15 (Pot Put)", penerima_pajak_id: 1 },
    { id: 7, jenis: "PPh 25 Kredit Pajak", penerima_pajak_id: 1 },
    { id: 8, jenis: "PPh 29 SPT Badan KB", penerima_pajak_id: 1 },
    { id: 9, jenis: "PPh 22 Ekspor", penerima_pajak_id: 1 },
    { id: 10, jenis: "PPN MASA KB", penerima_pajak_id: 1 },
    { id: 11, jenis: "Pajak Bumi dan Bangunan", penerima_pajak_id: 2 },
    { id: 12, jenis: "Pajak Penggunaan Hutan (IPPKH)", penerima_pajak_id: 2 },
    {
      id: 13,
      jenis: "Pajak Alat Berat / Kendaraan Bermotor",
      penerima_pajak_id: 2,
    },
    { id: 14, jenis: "Pajak Penerangan Jalan", penerima_pajak_id: 2 },
    {
      id: 15,
      jenis: "Pajak Air Permukaan / Bawah Tanah",
      penerima_pajak_id: 2,
    },
    { id: 16, jenis: "Pajak Daerah Jasa Boga", penerima_pajak_id: 2 },
    { id: 17, jenis: "Pajak Galian C", penerima_pajak_id: 2 },
    { id: 18, jenis: "Pajak Reklame", penerima_pajak_id: 2 },
    { id: 19, jenis: "Dividen", penerima_pajak_id: 3 },
    { id: 20, jenis: "SP3D (Sumbangan Pihak ke-3)", penerima_pajak_id: 3 },
    { id: 21, jenis: "BPHTB", penerima_pajak_id: 3 },
    {
      id: 22,
      jenis: "Iuran Produksi Batubara (ROYALTI)",
      penerima_pajak_id: 3,
    },
    {
      id: 23,
      jenis: "Iuran Tetap / Kuasa Penambangan",
      penerima_pajak_id: 3,
      sub: [
        { nama: "KW.96PP0289 (Peranap) 18.230 Ha2" },
        { nama: "KW.02.SS.2010 (Muara Tiga Besar) 2.866 Ha2" },
        { nama: "KW.ME.01.ET.011 (Banko Barat) 4.500 Ha2" },
        { nama: "KW.ME.01.ET.002 B (Banko Suban) 22.937 Ha2" },
        { nama: "KW.01.SS.2010 Air Laya 7.621 Ha2" },
        { nama: "KW.ME.01.ET.002 A (Banko Tengah) 2.423 Ha2" },
        { nama: "Landrent Ombilin" },
      ],
    },
    { id: 24, jenis: "Retribusi Kebersihan", penerima_pajak_id: 3 },
    { id: 25, jenis: "Retribusi IMB", penerima_pajak_id: 3 },
    { id: 26, jenis: "Sewa Perairan", penerima_pajak_id: 3 },
    {
      id: 27,
      jenis: "Retribusi Pemeriksaan Alat Pemadam Kebakaran",
      penerima_pajak_id: 3,
    },
    {
      id: 28,
      jenis: "PNBP Pendaftaran, Pelayanan dan Pengukuran Aset",
      penerima_pajak_id: 3,
    },
    { id: 29, jenis: "PNBP Biaya Hak Penggunaan (BHP)", penerima_pajak_id: 3 },
    { id: 30, jenis: "PNBP Peralihan Aset", penerima_pajak_id: 3 },
  ];

  res.status(200).json(data);
}
