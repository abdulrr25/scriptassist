import { useNavigate } from "react-router-dom";
import { Button, Container, Flex, Text } from "@mantine/core";
import { isAuthenticated, logoutUser, getCurrentUser } from "../auth/auth";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const auth = isAuthenticated();
  const username = getCurrentUser(); // Get the logged-in user

  return (
    <Container>
      <Flex justify="space-between" align="center" py="md">
        {/* Home Button with Authentication Check */}
        <Button
          variant="subtle"
          onClick={() => {
            auth ? navigate("/resources") : alert("You need to log in first!");
          }}
        >
          🚀 Home
        </Button>

        <Flex align="center" gap="md">
          {/* Display Logged-in Username */}
          {auth && <Text weight={500}>Welcome, {username}!</Text>}

          {/* Conditional Login/Logout Buttons */}
          {auth ? (
            <Button
              color="red"
              onClick={() => {
                logoutUser();
                navigate("/");
              }}
            >
              Logout
            </Button>
          ) : (
            <Button onClick={() => navigate("/")}>Login</Button>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
