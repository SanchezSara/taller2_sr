/* eslint-disable no-await-in-loop */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import clsx from 'clsx';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

// styles
// import useCommonStyles from 'hooks/useCommonStyles';

// Backend Data
import authService from 'services/authService';
import axios from 'axios';

function createData(status: string, number: number) {
  return { status, number };
}

const rows = [createData('Meat', 44), createData('Vegetable', 55), createData('Rice', 13)];

function createDataTodo(title: string, author: string, severity: string, status: string) {
  return { title, author, severity, status };
}

const todos = [
  createDataTodo('Learn React', 'SaraSanchez', 'low', 'completed'),
  createDataTodo('Learn React', 'SaraSanchez', 'medium', 'new'),
  createDataTodo('Learn React', 'SaraSanchez', 'high', 'inprocess'),
  createDataTodo('Learn React', 'SaraSanchez', 'high', 'completed'),
  createDataTodo('Learn React', 'SaraSanchez', 'medium', 'new'),
  createDataTodo('Learn React', 'SaraSanchez', 'medium', 'inprocess'),
];

function createDataUser(email: string, role: string) {
  return { email, role };
}

const usersDefault = [{ email: 'nhattruong1811@gmail.com', role: 'Admin' }];

const options: ApexOptions = {
  chart: {
    type: 'pie',
  },
  labels: ['Meat', 'Vegetable', 'Rice'],
};

const series = [44, 55, 13];

interface User {
  id: string;
  user_id: string;
  business_id: string;
  business: Business;
  score: number;
}

interface Business {
  id_: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: number;
  latitude: number;
  longitude: number;
  stars: number;
}

function Dashboard() {
  // const commonStyles = useCommonStyles();
  const [users, setUsers] = useState<User[]>();
  const [business, setBusiness] = useState<Business[]>();

  const getUsers = async () => {
    try {
      const user = authService.getUser();
      const parseUser = JSON.parse(user);
      const fullUsers: User[] = [];
      if (parseUser) {
        const response = await axios.post('https://sr-taller-1-backend.herokuapp.com/v2/predictions', {
          distance: 25,
          hours: 13,
          latitude: 36.162632,
          limit: 10,
          longitude: -86.775635,
          user_id: parseUser.username,
        });
        for (const userObj of response.data.response) {
          const businessResponse = await axios.get(
            `https://sr-taller-1-backend.herokuapp.com/v2/businesses/${userObj.business_id}`,
          );
          fullUsers.push({ ...userObj, business: businessResponse.data.response });
        }

        setUsers(fullUsers);
        console.log(fullUsers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!users) {
      getUsers();
    }
  }, []);

  // const getBusiness = async () => {
  //   const business_user: Business[] = [];
  //   try {
  //     const user = authService.getUser();
  //     const parseUser = JSON.parse(user);
  //     users.map(async (b) => {
  //       if (parseUser && b) {
  //         const response = await axios.post('https://sr-taller-1-backend.herokuapp.com/v2/businesses/', {
  //           business_id: b.business_id,
  //         });
  //         business_user.push(response.data.response);
  //       }
  //     });
  //     setBusiness(business_user);
  //     console.log(business_user);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   if (!users) {
  //     getBusiness();
  //   }
  // }, [users]);

  return (
    <div>
      <h2>Report</h2>
      {/* <Grid container>
        <Grid item xs={12}>
          <Paper>
            <Box m={2}>
              <Grid container item xs={12}>
                <h2>Products</h2>
              </Grid>
              <Grid container justify="space-between">
                <Grid item xs={12} sm={12} md={4}>
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Category</TableCell>
                          <TableCell align="right" />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row, idx) => (
                          <TableRow key={idx}>
                            <TableCell component="th" scope="row">
                              {row.status}
                            </TableCell>
                            <TableCell align="right">{row.number}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid container justify="center" item xs={12} sm={12} md={6}>
                  <div>
                    <FormControlLabel control={<Checkbox size="small" name="legend" color="primary" />} label="Legend" />
                    <br />
                    <Chart options={options} series={series} type="pie" width={500} />
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid> */}
      <Grid container spacing={3}>
        {/* <Grid item xs={12} sm={12} md={7}>
          <Paper>
            <Box m={2}>
              <Grid container item xs={12}>
                <h2>Tasks</h2>
              </Grid>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell width="30%">Title</TableCell>
                      <TableCell width="25%">Author</TableCell>
                      <TableCell width="30%">Progress</TableCell>
                      <TableCell width="15%">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {todos.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
                        <TableCell>{row.author}</TableCell>
                        <TableCell width="15%">
                          <Chip
                            className={clsx(
                              commonStyles.textCapitalize,
                              row.severity === 'low' && commonStyles.chipLow,
                              row.severity === 'medium' && commonStyles.chipMedium,
                              row.severity === 'high' && commonStyles.chipHigh,
                            )}
                            label={row.severity}
                          />
                        </TableCell>
                        <TableCell
                          className={clsx(
                            commonStyles.textCapitalize,
                            row.status === 'completed' && commonStyles.colorTextCompleted,
                            row.status === 'inprocess' && commonStyles.colorTextInprocess,
                          )}
                        >
                          {row.status}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Paper>
        </Grid> */}
        <Grid item xs={12} sm={12} md={12}>
          <Paper>
            <Box m={2}>
              <Grid container item xs={12}>
                <h2>Te recomendamos</h2>
              </Grid>
              {users && users.length > 0 && (
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Establecimiento</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Ciudad</TableCell>
                        <TableCell>Direccion</TableCell>
                        <TableCell>Codigo Postal</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((row, idx) => (
                        <TableRow key={idx}>
                          <TableCell component="th" scope="row">
                            {row.business.name}
                          </TableCell>
                          <TableCell>{row.score}</TableCell>
                          <TableCell>{row.business.city}</TableCell>
                          <TableCell>{row.business.address}</TableCell>
                          <TableCell>{row.business.postal_code}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
