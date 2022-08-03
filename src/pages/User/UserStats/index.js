import { lazy, Suspense, useEffect } from 'react';
import { STATS_GET } from '../../../api';
import Error from '../../../components/Helper/Error';
import Head from '../../../components/Helper/Head';
import Loading from '../../../components/Helper/Loading';
import useFetch from '../../../hooks/useFetch';

const UserStatsGraphs = lazy(() => import('./UserStatsGraph'));

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    const getData = async () => {
      const { url, options } = STATS_GET();

      await request(url, options);
    };

    getData();
  }, [request]);

  if (loading) return <Loading />;

  if (error) return <Error error={error} />;

  if (data)
    return (
      <Suspense fallback={<div></div>}>
        <Head title='Estatísticas' />
        <UserStatsGraphs data={data} />
      </Suspense>
    );
  else return null;
};

export default UserStats;
