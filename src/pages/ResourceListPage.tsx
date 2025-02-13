import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table, Loader, TextInput, Center, Alert, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const fetchResources = async ({ pageParam = "https://swapi.dev/api/people/" }) => {
  try {
    const { data } = await axios.get(pageParam);
    return { results: data.results, nextPage: data.next || undefined };
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
};

const ResourceListPage: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, refetch } = useInfiniteQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    retry: 2, // Retry fetching data twice before throwing an error
  });

  const [search, setSearch] = useState("");
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <Center style={{ flexDirection: "column", padding: "1rem" }}>
      <TextInput
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ maxWidth: "400px", marginBottom: "1rem" }}
      />

      

      <Table highlightOnHover striped withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth Year</th>
          </tr>
        </thead>
        <tbody>
          {data?.pages
            .flatMap((page) => page.results)
            .filter((char) => char.name.toLowerCase().includes(search.toLowerCase()))
            .map((character, index) => (
              <tr key={index}>
                <td>
                  <Link to={`/resource/${character.url.split("/").slice(-2, -1)[0]}`}>
                    {character.name}
                  </Link>
                </td>
                <td>{character.birth_year}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      {isFetchingNextPage && <Loader color="blue" mt="md" />}
      <div ref={observerRef}></div>

      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} mt="md" disabled={isFetchingNextPage}>
          Load More
        </Button>
      )}
    </Center>
  );
};

export default ResourceListPage;
