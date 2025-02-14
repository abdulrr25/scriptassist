import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Title, Text, Loader } from "@mantine/core";

const ResourceDetailPage: React.FC = () => {
  const { id } = useParams();
  const [resource, setResource] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setResource(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching resource:", error));
  }, [id]);

  if (loading) return <Loader size="xl" style={{ margin: "auto", display: "block" }} />;

  return (
    <Card shadow="sm" padding="lg" style={{ maxWidth: 500, margin: "auto", marginTop: "5rem" }}>
      <Title order={2} align="center">{resource?.name}</Title>
      <Text>Height: {resource?.height}cm</Text>
      <Text>Mass: {resource?.mass}kg</Text>
      <Text>Hair Color: {resource?.hair_color}</Text>
      <Text>Eye Color: {resource?.eye_color}</Text>
      <Text>Birth Year: {resource?.birth_year}</Text>
    </Card>
  );
};

export default ResourceDetailPage;
