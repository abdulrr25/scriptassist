import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
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

    if (localStorage.getItem(username)) {
      setError("User already exists. Try logging in.");
      return;
    }

    localStorage.setItem(username, JSON.stringify({ username, password }));
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "url('/background.jpg') no-repeat center center/cover",
      }}
    >
      <Container
        size={420}
        style={{
          backdropFilter: "blur(15px)",
          padding: "2rem",
          borderRadius: "15px",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
        }}
      >
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card
            shadow="lg"
            padding="lg"
            radius="md"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "white",
            }}
          >
            <Title order={2} align="center" style={{ marginBottom: "1rem", color: "#fff", fontWeight: 600 }}>
            Sign Up and Get Started 🚀
            </Title>

            {error && <Alert color="red" style={{ marginBottom: "1rem" }}>{error}</Alert>}

            <TextInput
              label="Username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              styles={{
                input: { backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#fff", border: "none" },
              }}
            />

            <PasswordInput
              label="Password"
              placeholder="Enter Your Secret"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              mt="sm"
              styles={{
                input: { backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#fff", border: "none" },
              }}
            />

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleSignUp}
                fullWidth
                mt="md"
                style={{
                  backgroundColor: "#3498db",
                  color: "#fff",
                  borderRadius: "8px",
                  fontWeight: 600,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                Sign Up
              </Button>
            </motion.div>

            <Title order={6} align="center" mt="md" style={{ color: "#fff" }}>
              Already have an account? <Link to="/login" style={{ color: "#3498db" }}>Login here</Link>
            </Title>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
};

export default SignUp;
