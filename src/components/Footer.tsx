import React from 'react';
import { Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const backgroundColor = theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.background.paper;

  return (
    <footer style={{ backgroundColor, padding: theme.spacing(3, 0), color: theme.palette.text.primary, marginTop: theme.spacing(4) }}> {/* 增加marginTop来添加顶部间距 */}
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" align={matches ? 'left' : 'center'}>
              GroceryHub © {new Date().getFullYear()}
            </Typography>
            <Typography variant="body2" align={matches ? 'left' : 'center'}>
              All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" align={matches ? 'right' : 'center'}>
              Contact Us: info@groceryhub.com
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
