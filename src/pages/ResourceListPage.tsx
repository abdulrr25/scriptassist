import { useEffect, useState } from "react";
import { Card, Grid, Title, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ResourceListPage: React.FC = () => {
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/people/")
      .then((res) => res.json())
      .then((data) => setResources(data.results))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <Title order={2} align="center" mb="lg">Star Wars Characters</Title>
      <Grid>
        {resources.slice(0, 10).map((character, index) => (
          <Grid.Col key={index} span={4}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to={`/resource/${index + 1}`} style={{ textDecoration: "none" }}>
                <Card shadow="md" padding="lg">
                  <Text weight={500}>{character.name}</Text>
                  <Text size="sm" color="gray">Height: {character.height}cm</Text>
                  <Text size="sm" color="gray">Mass: {character.mass}kg</Text>
                </Card>
              </Link>
            </motion.div>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default ResourceListPage;
