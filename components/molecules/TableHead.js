export default function TableHead({ dataHead }) {
  return (
    <thead>
      <tr>
        {dataHead.map((data, index) => {
          return (
            <th
              width={data.width}
              key={index}
              style={{
                color: "#A1A5B7",
                fontSize: "13px",
                fontWeight: "400",
              }}
              className={data.className}
            >
              {data.name}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
