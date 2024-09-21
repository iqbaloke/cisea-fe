export default function handler(req, res) {
  const data = [
    {
      username: "john_doe",
      password: "password123",
      role: "AM PPN",
      name: "John Doe",
    },
    {
      username: "jane_smith",
      password: "securepass456",
      role: "Spesialis Keuangan",
      name: "Jane Smith",
    },
    {
      username: "mike_jones",
      password: "mikepass789",
      role: "AM PPN",
      name: "Mike Jones",
    },
    {
      username: "lisa_ray",
      password: "raypassword111",
      role: "Spesialis Keuangan",
      name: "Lisa Ray",
    },
  ];

  res.status(200).json(data);
}
