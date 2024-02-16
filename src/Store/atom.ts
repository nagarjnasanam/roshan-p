import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { unmarshallDynamoDBItem } from "../utils/utils";

export const userAtom = atom<Record<any, any> | null>(null);
export const currentPageAtom = atom(1)
export const currentCases = atom<any[]>([])
export const sortBy = atom<string | null>(null)
const apiKey = "pmTi6gOA6T4Y0oUlk5e6i3uqlzQImBRJ13Gnc62V";

const headersConfig = {
    headers: {
        "X-Api-Key": `${apiKey}`,
        //   'Access-Control-Allow-Origin': '*',
    },
};

export const caseAtom = atomWithQuery((
    // _get
) => ({
    queryKey: ["cases",
        // _get(userAtom)
    ],
    queryFn: async ({ queryKey: [,] }) => {
        try {
            const res = await fetch(
                `https://flfonxxcud.execute-api.us-west-2.amazonaws.com/dev/cases/transcribe/metadata`,
                headersConfig
            );
            const jsonVal = await res.json();
            const bodyArr = jsonVal.body;

            if (Array.isArray(bodyArr)) {

                return new Promise((res) => res({ data: bodyArr.map(unmarshallDynamoDBItem) }));
            }
        } catch (error) {
            console.log('error', error)
            return new Promise((_res, rej) => rej({
                data: [],
                // status: error?.status
            }));
        }

        return [];
    },
    refetchInterval: 10000,
    refetchOnWindowFocus: true
}));


export const  searchAtom = atom<string | undefined>(undefined)

export const  filteredAtom = atom<string | undefined>(undefined)
