import { useEffect, useState } from 'react';
import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { IApiResponseInfo } from '../../types';

interface IEpisode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

interface IGridColumn {
  field: string;
  headerName: string;
  width: number;
}

const COLUMNS: IGridColumn[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'air_date', headerName: 'Air Date', width: 250 },
  { field: 'episode', headerName: 'Episode', width: 250 },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: 'white',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  })
);

export function EpisodesPage() {
  const classes = useStyles();
  const [episodesInfo, setEpisodesInfo] = useState<IApiResponseInfo | null>(null);
  const [episodesRows, setEpisodesRows] = useState<IEpisode[]>([]);

  const fetchEpisodes = async (page?: number) => {
    const baseUrl = `https://rickandmortyapi.com/api/episode?${
      page ? `page=${page}` : ''
    }`;

    const episodesRequest = await fetch(baseUrl);
    const data = await episodesRequest.json();

    const rows = data.results.map((episodeItem: IEpisode) => ({
      id: episodeItem.id,
      name: episodeItem.name,
      air_date: episodeItem.air_date,
      episode: episodeItem.episode,
    }));

    setEpisodesInfo(data.info);
    setEpisodesRows(rows);
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const handleFetchEpisodes = ({ page }: { page: number }) => {
    fetchEpisodes(page + 1);
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <div style={{ height: 800, width: '100%' }}>
        <DataGrid
          rows={episodesRows}
          columns={COLUMNS}
          pagination
          pageSize={20}
          paginationMode="server"
          rowCount={episodesInfo?.count}
          onPageChange={handleFetchEpisodes}
        />
      </div>
    </Container>
  );
}
