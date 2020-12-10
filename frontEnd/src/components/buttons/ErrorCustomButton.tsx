import * as React from "react";

import { Avatar, Button } from "@material-ui/core";

import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    button: {
        backgroundColor: "#272727",
        borderRadius: "15px",
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#ff6666"
        },
        textTransform: "none",
    },
    routerLink: {
        textDecoration: 'none',
    }
}));

interface Props {
    text: string,
    type: "long" | "short",
    disabled?: boolean,
    externalHref?: boolean,
    href?: string,
    id?: string,
    iconSrc?: string,
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
    variant?: "contained" | "outlined",
    wallet?: boolean,
}

export const ErrorCustomButton: React.FC<Props> = (props: Props) => {

    const classes = useStyles();

    let backgroundColor = "";
    let border = "";
    let externalHref = { pathname: props.href };
    let color: "default" | "primary" | "secondary" = "default";
    let icon = null;
    let minHeight = "";
    let minWidth = "";
    let pointerEvents = "auto";
    let variant: "contained" | "outlined" = props.variant || "contained";
    if (props.type === "long") {
        minHeight = "50px";
        minWidth = "400px";
    }
    else {
        minHeight = "40px";
        minWidth = "140px";
    }

    if (props.wallet === true) {
        color = "primary";
        pointerEvents = "none";
    }
    else if (props.disabled !== true && props.variant !== "contained") {
        border = "solid 2px #ff6666";
        variant = "outlined";
    }

    const button = <Button
        color={color}
        className={classes.button}
        disabled={props.disabled}
        id={props.id}
        onClick={props.onClick}
        startIcon={icon}
        style={{
            border: border,
            minHeight: minHeight,
            minWidth: minWidth,
            // @ts-ignore
            pointerEvents: pointerEvents,
        }}
        variant={variant}
    >
        {props.text}
    </Button>;

    const content = !props.href ? button :
        <Link
            className={classes.routerLink}
            target={props.externalHref === true ? "_blank" : ""}
            to={props.externalHref === true ? externalHref : props.href}>
            {button}
        </Link>;

    return content;
}