import { useEffect, useState } from "react";
import { Card, Grid, Title, Text, Container, Loader, Alert } from "@mantine/core";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ResourceListPage: React.FC = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://swapi.dev/api/people/")
      .then((res) => res.json())
      .then((data) => {
        setResources(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem 1rem",
      }}
    >
      <Container size="lg">
        <Title align="center" mb="lg" style={{ fontSize: "2rem", fontWeight: "bold" }}>
          Star Wars Characters
        </Title>

        {loading && <Loader size="lg" color="blue" style={{ display: "block", margin: "auto" }} />}
        {error && <Alert color="red">{error}</Alert>}

        {!loading && !error && (
          <Grid>
            {resources.slice(0, 10).map((character, index) => (
              <Grid.Col key={index} xs={12} sm={6} md={4} lg={3}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to={`/resource/${index + 1}`} style={{ textDecoration: "none" }}>
                    <Card
                      shadow="lg"
                      padding="lg"
                      radius="md"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(8px)",
                        color: "white",
                        transition: "0.3s",
                      }}
                    >
                      <Text size="lg" weight={600} align="center">
                        {character.name}
                      </Text>
                      <Text size="sm" color="gray" align="center">
                        Height: {character.height}cm | Mass: {character.mass}kg
                      </Text>
                    </Card>
                  </Link>
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default ResourceListPage;
