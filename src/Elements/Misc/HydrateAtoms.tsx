import { queryClientAtom } from "jotai-tanstack-query"
import { useHydrateAtoms } from "jotai/react/utils"

export const HydrateAtoms = ({ children, queryClient  }: {
    children: any;
    queryClient: any
  }) => {
    useHydrateAtoms([[queryClientAtom, queryClient]])
    return children
  }