import { Box, Typography } from '@material-ui/core';
import styles from './start.module.css';

export function StartPage() {
  return (
    <div className={styles.startPage}>
      <Box position="relative" width="80%" left="5%" top="10%">
        <Typography variant="h3" component="h1" color="secondary">
          Rick and Morty App
        </Typography>
      </Box>
    </div>
  );
}

/* color: ; */
