import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiSummaryLibrary } from "../../utils/axios";

interface RulesName {
  "AD(Criteo)": number;
  "AD(Insider)": number;
  "AD(Optimise)": number;
}

export interface LibrarySummary {
  rulesName: RulesName;
  total: number;
}

export default function useLibrary() {
  const { libraryId } = useParams<{
    libraryId: string;
  }>();

  const {
    data: librarySummary,
    isLoading: isLibraryLoading,
    error: libraryError,
  } = useQuery<LibrarySummary, Error>({
    queryKey: ["LibrarySummary", libraryId],
    queryFn: () => apiSummaryLibrary(libraryId ?? ""),
    enabled: !!libraryId,
  });

  return {
    librarySummary,
    isLibraryLoading,
    libraryError,
  };
}
