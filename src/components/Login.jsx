import { useState } from "react";
import { login } from "../services/index";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await login(email, password);
    if (response) {
      navigate("/products");
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-2 w-[250px] p-8">
        <input
          type="email"
          placeholder="email"
          value={email}
          className="border-2 border-black px-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          className="border-2 border-black px-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded"
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default Login;
