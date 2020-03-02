import React from 'react';
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";




const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export class LeadList extends React.Component {
  // const classes = useStyles();

  componentDidMount() {
    console.log(123)
  }

  render() {
    return (
    <Container component="main" maxWidth="xs">
123
    </Container>
  );
  }


};

// const Auth = () => {
//     return (
//     <Button variant="contained" color="primary">
//       Hello World
//     </Button>
//   );
// };
