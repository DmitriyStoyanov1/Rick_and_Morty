import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  media: {
    height: 140,
  },
});

interface ICharacterCard {
  id: number;
  name: string;
  image: string;
  onClick: (id: number) => void;
}

export function CharacterCard({ id, name, image, onClick }: ICharacterCard) {
  const classes = useStyles();

  return (
    <Card>
      <CardMedia className={classes.media} image={image} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Some additional description
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onClick(id)}>
          Open
        </Button>
      </CardActions>
    </Card>
  );
}
