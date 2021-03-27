import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormControl, Select, InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filter: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 120px)',
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

export enum EFilterItemName {
  GENDER = 'gender',
  SPECIES = 'species',
  STATUS = 'status'
}

interface IFilterItemProps {
  name: EFilterItemName;
  // eslint-disable-next-line
  labelText?: string;
  children: React.ReactNode[];
  onFilterChange: (name: string, value: string) => void;
}

type TChangeEvent = React.ChangeEvent<{
  name?: string | undefined;
  value: unknown;
}>;

export function FilterItem({
  name,
  labelText = '',
  children,
  onFilterChange,
}: IFilterItemProps) {
  const classes = useStyles();

  const handleSelectChange = (event: TChangeEvent) => {
    onFilterChange(name, event.target.value as string);
  };

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id={`${name}-select-filled-label`}>{labelText}</InputLabel>
      <Select
        id={`${name}-select-filled`}
        labelId={`${name}-select-filled-label`}
        onChange={handleSelectChange}
      >
        {children}
      </Select>
    </FormControl>
  );
}
