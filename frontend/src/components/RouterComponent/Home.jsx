import React from 'react';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Header } from '../Header';
import { divider, urlPages } from './routerComponent.constants';

const HomeComp = () => {
  const listItems = urlPages.map((page, index) => (
    page.title === divider
      ? null
      : (
        <ListItem button key={page.title}>
          <div
            style={{ minWidth: '200px' }}
          >
            <Link href={page.url}>
              <ListItemText>
                <span>&#8226;</span>
                {' '}
                {page.title}
              </ListItemText>
            </Link>
          </div>
        </ListItem>
      )
  ));
  return (
    <div>
      <Header
        pageTitle="CmcSurveyval. Опросы о качестве образования на ВМК"
      />
      <Container style={{ padding: '50px 30px 0' }} maxWidth="sm">
        <Card>
          <CardContent>
            <Typography variant="h5" style={{ padding: '10px 20px 0' }}>Куда отправимся?</Typography>
            <List
              style={{ marginLeft: '30px' }}
            >
              {listItems}
            </List>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export const Home = HomeComp;
