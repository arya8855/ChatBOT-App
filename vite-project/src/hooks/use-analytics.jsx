import { useGetLeadAnalyticsQuery } from "../redux/slice/lead-slice";

const useAnalytics = () => {
  const { data } = useGetLeadAnalyticsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return { data };
};

export default useAnalytics;