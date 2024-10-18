import { useState, useEffect } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST", // Set the method to POST
        headers: {
          "Content-Type": "application/json", // Ensure the backend knows the data format
        },
        body: JSON.stringify({
          // You can include any data you need to send in the request body here
          username: "Islomjon", // Replace with dynamic data if needed
          email: "islomjon@gmail.com",
          password: "Islomlom",
        }),
      });
      console.log(`Request successful with status code: ${res.status}`); // 200-299
      const data = await res.json();
      setUser(data);

      console.error(`Failed to fetch data:${res.status}`);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 bg-white text-black rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          User data: {user}{" "}
        </h1>
      </div>
    </div>
  );
}
