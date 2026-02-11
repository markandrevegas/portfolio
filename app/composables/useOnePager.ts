// composables/useOnePager.ts
import { useContentful } from "./useContentful"

export const useOnePager = () => {
	const { getEntry } = useContentful()
	const ENTRY_ID = "tvmagv98WHR9YBjGRhG4k"

	return getEntry(ENTRY_ID)
}
