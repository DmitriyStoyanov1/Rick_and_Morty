import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MenuItem, Button } from '@material-ui/core';
import { FilterItem, EFilterItemName } from './filterItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filter: {
      display: 'grid',
      gridTemplateColumns: '200px 200px 200px 120px',
      justifyContent: 'center',
      gridGap: 16,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    formControl: {
      minWidth: 120,
    },
  })
);

interface IFilterProps {
  onFilterChange: (key: string, value: string) => void;
  onFilterAction: () => void;
}

const GENDERS: string[] = ['all', 'female', 'male', 'genderless', 'unknown'];
const SPECIES: string[] = ['all', 'human', 'alien'];
const STATUS: string[] = ['all', 'alive', 'dead', 'unknown'];

export function Filter({ onFilterChange, onFilterAction }: IFilterProps) {
  const classes = useStyles();

  return (
    <div className={classes.filter}>
      <FilterItem
        name={EFilterItemName.GENDER}
        labelText="Gender"
        onFilterChange={onFilterChange}
      >
        {GENDERS.map((current) => (
          <MenuItem key={current} value={current}>
            {current}
          </MenuItem>
        ))}
      </FilterItem>

      <FilterItem
        name={EFilterItemName.SPECIES}
        labelText="Species"
        onFilterChange={onFilterChange}
      >
        {SPECIES.map((current) => (
          <MenuItem key={current} value={current}>
            {current}
          </MenuItem>
        ))}
      </FilterItem>

      <FilterItem
        name={EFilterItemName.STATUS}
        labelText="Status"
        onFilterChange={onFilterChange}
      >
        {STATUS.map((current) => (
          <MenuItem key={current} value={current}>
            {current}
          </MenuItem>
        ))}
      </FilterItem>

      <Button
        size="large"
        variant="contained"
        color="primary"
        onClick={onFilterAction}
      >
        Filter
      </Button>
    </div>
  );
}
