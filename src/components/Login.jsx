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
    <>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" onClick={handleSubmit}>
        submit
      </button>
    </>
  );
};

export default Login;
