export default function handler(req, res) {
  const data = [
    {
      id : 1,
      username: "john_doe",
      password: "password123",
      role: "AM PPN",
      name: "John Doe",
    },
    {
      id : 2,
      username: "jane_smith",
      password: "securepass456",
      role: "Spesialis Keuangan",
      name: "Jane Smith",
    },
    {
      id : 3,
      username: "mike_jones",
      password: "mikepass789",
      role: "AM PPN",
      name: "Mike Jones",
    },
    {
      id : 4,
      username: "lisa_ray",
      password: "raypassword111",
      role: "Spesialis Keuangan",
      name: "Lisa Ray",
    },
  ];

  res.status(200).json(data);
}
