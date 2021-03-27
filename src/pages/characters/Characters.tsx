import { useEffect, useState } from 'react';
import { Pagination } from '@material-ui/lab';
import {
  Avatar,
  Box,
  Container,
  createStyles,
  makeStyles,
  Modal,
  Theme,
} from '@material-ui/core';

import { IApiResponseInfo, ICharacterEntity } from '../../types';
import { CharacterCard, Filter } from '../../components';
import { CardSkeleton } from './Skeleton';

import style from './style.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: 'white',
    },
    modalBody: {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
      position: 'absolute',
      minWidth: 600,
      display: 'grid',
      gridTemplateColumns: 'min-content 1fr',
      gridColumnGap: 24,
      backgroundColor: theme.palette.background.paper,
      borderRadius: '6px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4, 4, 4),
    },
  })
);

const PAGE_SIZE = 20;

interface IFilter {
  gender: 'all' | 'female' | 'male' | 'genderless' | 'unknown';
  species: 'all' | 'human' | 'alien';
  status: 'all' | 'alive' | 'dead' | 'unknown';
}

export function CharactersPage() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [charactersInfo, setCharactersInfo] = useState<IApiResponseInfo | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [characters, setCharacters] = useState<ICharacterEntity[]>([]);
  const [isCharacterModalOpened, setIsCharacterModalOpened] = useState<boolean>(
    false
  );

  const [character, setCharacter] = useState<ICharacterEntity | null>(null);

  const [filter, setFilter] = useState<IFilter>({
    gender: 'all',
    species: 'all',
    status: 'all',
  });

  const buildFilterQueryParams = (filterObject: IFilter) =>
    Object.entries(filterObject)
      .filter(([_, value]) => value !== 'all')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

  const fetchCharaters = async (page?: number) => {
    let baseUrl = 'https://rickandmortyapi.com/api/character?';

    if (buildFilterQueryParams(filter)) {
      baseUrl += buildFilterQueryParams(filter);
    }

    if (page) {
      baseUrl += buildFilterQueryParams(filter)
        ? `&page=${page}`
        : `page=${page}`;
    }

    try {
      setIsLoading(true);

      const response = await fetch(baseUrl);
      const data = await response.json();

      const { info, results } = data;

      setCharactersInfo(info);
      setCharacters(results);

      if (page) {
        setCurrentPage(page);
      } else {
        setCurrentPage(1);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCharaters();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };

  const handleFilterSubmit = async () => {
    await fetchCharaters();
  };

  // eslint-disable-next-line
  const handlePaginationClick = async (_: any, page: number) => {
    await fetchCharaters(page);
  };

  const handleCharacterCardClick = (id: number) => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacter(data);
        setIsCharacterModalOpened(true);
      });
  };

  const handleClose = () => {
    setIsCharacterModalOpened(false);
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Filter
        onFilterChange={handleFilterChange}
        onFilterAction={handleFilterSubmit}
      />
      <Modal
        open={isCharacterModalOpened}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <>
          {character && (
            <div className={classes.modalBody}>
              <div>
                <Avatar
                  style={{ width: 200, height: 200 }}
                  alt="Remy Sharp"
                  src={character.image}
                />
              </div>
              <ul className={style.modalList}>
                <li>
                  <span className={style.modalListKey}>Name</span>:{' '}
                  <span>{character.name}</span>
                </li>
                <li>
                  <span className={style.modalListKey}>Species</span>:{' '}
                  <span>{character.species}</span>
                </li>
                <li>
                  <span className={style.modalListKey}>Status</span>:{' '}
                  <span>{character.status}</span>
                </li>
                <li>
                  <span className={style.modalListKey}>Gender</span>:{' '}
                  <span>{character.gender}</span>
                </li>
                <li>
                  <span className={style.modalListKey}>Origin</span>:{' '}
                  <span>{character.origin.name}</span>
                </li>
              </ul>
            </div>
          )}
        </>
      </Modal>

      <Box display="grid" gridGap="16px" gridTemplateColumns="repeat(5, 1fr)">
        {isLoading &&
          Array.from(new Array(PAGE_SIZE)).map((_, index) => (
            // eslint-disable-next-line
            <CardSkeleton key={index} />
          ))}

        {!isLoading &&
          characters?.map(({ id, name, image }) => (
            <CharacterCard
              key={id}
              id={id}
              name={name}
              image={image}
              onClick={handleCharacterCardClick}
            />
          ))}
      </Box>

      <Box display="flex" justifyContent="center" py={6}>
        <Pagination
          color="primary"
          size="large"
          page={currentPage}
          count={charactersInfo?.pages}
          onChange={handlePaginationClick}
        />
      </Box>
    </Container>
  );
}
