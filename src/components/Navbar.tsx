import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Text, Group, Container } from "@mantine/core";
import { getLoggedInUser, logoutUser } from "../auth/auth";

const Navbar: React.FC = () => {
  const [username, setUsername] = useState<string | null>(getLoggedInUser());
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(getLoggedInUser());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUsername(null);
    navigate("/login");
  };

  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        padding: "1rem 0",
        borderBottom: "1px solid #ddd",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
        }}
      >
        <Link to="/resources" style={{ textDecoration: "none", color: "#000" }}>
          <Text size="xl" weight={700} style={{ fontFamily: "Poppins, sans-serif" }}>
            MyApp
          </Text>
        </Link>

        <Group>
          {username ? (
            <>
              <Text size="md" weight={500} style={{ marginRight: "1rem", color: "#333" }}>
                Welcome, {username}
              </Text>
              <Button onClick={handleLogout} color="red" size="sm">
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </Group>
      </Container>
    </header>
  );
};

export default Navbar;
