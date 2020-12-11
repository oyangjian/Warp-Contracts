import * as React from "react";

import { Grid, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";

import { LeaderboardRow } from "../../components/uiElements/LeaderboardRow";
import { TablePaginationActions } from "../../components"
import { Team, } from "../../util/calculateTeamMetrics";

interface Props {
    teams: Team[],
}

export const LeaderboardTable: React.FC<Props> = (props: Props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Grid
            container
            direction="column"
            alignItems="stretch"
        >
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Rank
                                </Typography>
                            </TableCell>
                            <TableCell >
                                <Typography variant="subtitle1" color="textSecondary">
                                    TVL Contribution
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle1" color="textSecondary">
                                    TVL
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? props.teams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.teams
                        ).map((team: Team, index: number) => {
                            return (
                                <LeaderboardRow
                                    rank={index + rowsPerPage * page}
                                    team={team}
                                />
                            )
                        })}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            component={TableRow}
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            count={props.teams.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            //@ts-ignore
                            ActionsComponent={TablePaginationActions}
                            style={{ width: 600 }}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
        </Grid>
    );
}