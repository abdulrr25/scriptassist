import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Title, Text, Loader, Center, Alert } from "@mantine/core";

// Fetch character details
const fetchCharacter = async (id: string) => {
  const { data } = await axios.get(`https://swapi.dev/api/people/${id}/`);
  return data;
};

// Fetch additional data (Homeworld)
const fetchHomeworld = async (url: string) => {
  const { data } = await axios.get(url);
  return data.name;
};

const ResourceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: character,
    isLoading,
    error,
  } = useQuery(["character", id], () => fetchCharacter(id!), { enabled: !!id });

  const {
    data: homeworld,
    isLoading: homeworldLoading,
    error: homeworldError,
  } = useQuery(["homeworld", character?.homeworld], () => fetchHomeworld(character!.homeworld), {
    enabled: !!character?.homeworld,
  });

  if (isLoading || homeworldLoading)
    return (
      <Center>
        <Loader color="blue" />
      </Center>
    );

  if (error || homeworldError)
    return (
      <Center>
        <Alert color="red">Failed to load character details. Please try again.</Alert>
      </Center>
    );

  return (
    <Center style={{ flexDirection: "column", padding: "2rem" }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={2} mb="sm">
          {character?.name}
        </Title>
        <Text size="md">
          <strong>Birth Year:</strong> {character?.birth_year}
        </Text>
        <Text size="md">
          <strong>Height:</strong> {character?.height} cm
        </Text>
        <Text size="md">
          <strong>Homeworld:</strong> {homeworld || "Unknown"}
        </Text>
      </Card>
    </Center>
  );
};

export default ResourceDetailPage;
