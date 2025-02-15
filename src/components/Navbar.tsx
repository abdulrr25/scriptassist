import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Text, Group, Container } from "@mantine/core";
import { getLoggedInUser, logoutUser } from "../auth/auth";

const Navbar: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation(); // ⬅️ Detects route changes

  // Update username when the component mounts and when route changes
  useEffect(() => {
    setUsername(getLoggedInUser());
  }, [location.pathname]); // ⬅️ Re-run effect on route change

  const handleLogout = () => {
    logoutUser();
    setUsername(null);
    navigate("/login");
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "50px",
        backdropFilter: "blur(10px)",
        background: "rgba(173, 216, 230, 0.3)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1100px",
          width: "100%",
        }}
      >
        <Link to="/resources" style={{ textDecoration: "none", color: "#fff" }}>
          <Text size="lg" weight={700} style={{ fontFamily: "Poppins, sans-serif" }}>
            MyApp
          </Text>
        </Link>

        <Group>
          {username ? (
            <>
              <Text size="sm" weight={500} style={{ marginRight: "1rem", color: "#fff" }}>
                {username}
              </Text>
              <Button onClick={handleLogout} color="red" size="xs">
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="xs">Login</Button>
            </Link>
          )}
        </Group>
      </Container>
    </header>
  );
};

export default Navbar;
