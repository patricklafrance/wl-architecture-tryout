import { Div, H2, Text } from "@hopper-ui/components";
import { getJson } from "@packages/core";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Character {
    id: number;
    name: string;
    species: string;
}

export function HomePage() {
    const { data: characters } = useSuspenseQuery({ queryKey: ["/host/api/character/1,2"], queryFn: async () => {
        return (await getJson("/host/api/character/1,2")).data as Character[];
    } });

    console.log(characters);

    return (
        <Div>
            <H2>HomePage</H2>
            <Div>
                {characters.map(x => {
                    return (
                        <Div key={x.id}>
                            <Text>Id: {x.id}</Text>
                            <Text> - </Text>
                            <Text>Name: {x.name}</Text>
                            <Text> - </Text>
                            <Text>Species: {x.species}</Text>
                        </Div>
                    );
                })}
            </Div>
        </Div>
    );
}
