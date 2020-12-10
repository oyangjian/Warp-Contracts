import * as React from "react";

import { Grid, TableCell, TableRow, Typography } from "@material-ui/core";

import { Team, } from "../../util/calculateTeamMetrics";

interface Props {
    rank: number,
    team: Team,
}

export const LeaderboardRow: React.FC<Props> = (props: Props) => {
    const place = props.rank + 1 === 1 ? "st" :
        props.rank + 1 === 2 ? "nd" :
            props.rank + 1 === 3 ? "rd" :
                "th";

    return (
        <TableRow>
            <TableCell>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                >
                    <Grid item>
                        <Typography variant="subtitle1" color="textSecondary">
                            {(props.rank + 1) + `${place} place`}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1">
                            {props.team.name}
                        </Typography>
                    </Grid>
                </Grid>
            </TableCell>
            <TableCell>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Typography variant="subtitle1" color="textSecondary">
                        TVL:
                    </Typography>
                    <Typography variant="subtitle1">
                        {props.team.tvl}
                    </Typography>
                </Grid>
            </TableCell>
        </TableRow>);
}