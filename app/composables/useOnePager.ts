// composables/useOnePager.ts
import { useContentful } from "./useContentful"

export const useOnePager = () => {
	const { getEntry } = useContentful()
	
	const ENTRY_ID = "3nxo1Jb1Nl2Sd5ZsUAfB8n"

	return getEntry(ENTRY_ID)
}
