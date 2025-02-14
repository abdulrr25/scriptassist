import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUpUser } from "../auth/auth";
import { TextInput, Button, Card, Title, Alert, Container, PasswordInput } from "@mantine/core";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = () => {
    setError(null); // Clear previous errors

    if (!username.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (signUpUser(username, password)) {
      navigate("/login");
    } else {
      setError("User already exists. Try logging in.");
    }
  };

  return (
    <Container size={420} style={{ marginTop: "5rem" }}>
      <Card shadow="sm" padding="lg" radius="md">
        <Title order={2} align="center" style={{ marginBottom: "1rem" }}>
          Create an Account
        </Title>

        {error && <Alert color="red" style={{ marginBottom: "1rem" }}>{error}</Alert>}

        <TextInput
          label="Username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          mt="sm"
        />

        <Button onClick={handleSignUp} fullWidth mt="md">
          Sign Up
        </Button>

        <Title order={6} align="center" mt="md">
          Already have an account? <Link to="/login">Login here</Link>
        </Title>
      </Card>
    </Container>
  );
};

export default SignUp;
