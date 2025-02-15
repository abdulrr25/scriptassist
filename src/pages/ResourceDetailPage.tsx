import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Title, Text, Loader, Container, Alert } from "@mantine/core";
import { motion } from "framer-motion";

const ResourceDetailPage: React.FC = () => {
  const { id } = useParams();
  const [resource, setResource] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch resource");
        return res.json();
      })
      .then((data) => {
        setResource(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Oops! Something went wrong.");
        setLoading(false);
      });
  }, [id]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        color: "white",
      }}
    >
      <Container size="sm">
        {loading && (
          <Loader size="xl" color="blue" style={{ display: "block", margin: "auto" }} />
        )}

        {error && (
          <Alert color="red" style={{ textAlign: "center", fontSize: "1.2rem" }}>
            {error}
          </Alert>
        )}

        {!loading && !error && resource && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              shadow="lg"
              padding="lg"
              radius="md"
              style={{
                maxWidth: 500,
                margin: "auto",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(12px)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <Title order={2} align="center" style={{ marginBottom: "1rem" }}>
                {resource.name}
              </Title>

              <Text size="lg" align="center" style={{ marginBottom: "0.5rem" }}>
                <strong>Height:</strong> {resource.height} cm
              </Text>

              <Text size="lg" align="center" style={{ marginBottom: "0.5rem" }}>
                <strong>Mass:</strong> {resource.mass} kg
              </Text>

              <Text size="lg" align="center" style={{ marginBottom: "0.5rem" }}>
                <strong>Hair Color:</strong> {resource.hair_color}
              </Text>

              <Text size="lg" align="center" style={{ marginBottom: "0.5rem" }}>
                <strong>Eye Color:</strong> {resource.eye_color}
              </Text>

              <Text size="lg" align="center">
                <strong>Birth Year:</strong> {resource.birth_year}
              </Text>
            </Card>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default ResourceDetailPage;
