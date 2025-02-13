import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextInput, Card, Title, Alert } from "@mantine/core";
import { authenticateUser } from "../auth/auth";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Username and password cannot be empty.");
      return;
    }

    if (authenticateUser(username, password)) {
      navigate("/resources");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Card shadow="sm" padding="lg" style={{ maxWidth: 400, margin: "auto", marginTop: "5rem" }}>
      <Title order={2} align="center" mb="md">
        Login
      </Title>

      {error && <Alert color="red" mb="md">{error}</Alert>}

      <TextInput
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextInput
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button onClick={handleLogin} fullWidth mt="md">
        Login
      </Button>
    </Card>
  );
};

export default LoginPage;
