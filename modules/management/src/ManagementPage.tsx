import { Div, H2, Text } from "@hopper-ui/components";
import { getJson } from "@packages/core";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Character {
    id: number;
    name: string;
    species: string;
}

export function ManagementPage() {
    const { data: characters } = useSuspenseQuery({ queryKey: ["/management/api/character/1,2"], queryFn: async () => {
        return (await getJson("/management/api/character/1,2")).data as Character[];
    } });

    return (
        <Div>
            <H2>Management</H2>
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
