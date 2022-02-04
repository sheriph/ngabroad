import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Badge, Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { user_, showLogin_, userData_ } from "../state/recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import LoginWrapper from "./loginwrapper";
import { Auth } from "aws-amplify";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function LoginMenu() {
  const [user, setUser] = useRecoilState(user_);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showLogin, setShowLogin] = useRecoilState(showLogin_);
  const userData = useRecoilState(userData_);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccount = () => {
    if (user) {
      console.log("go to my account");
    } else {
      setShowLogin(true);
    }
    setAnchorEl(null);
  };

  const handleLoginAndOut = () => {
    if (user) {
      mySignOut();
    } else {
      setShowLogin(true);
    }
    setAnchorEl(null);
  };

  function mySignOut() {
    Auth.signOut()
      .then(() => {
        setUser(null);
        setShowLogin(false);
      })
      .catch((err) => {
        console.log("error: cant signout", err);
      });
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        component={Box}
        sx={{ minWidth: "auto" }}
      >
        {user ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              sx={{ width: 24, height: 24 }}
              src={
                // @ts-ignore
                userData?.avatar
              }
            >
              {
                // @ts-ignore
                userData.email &&
                  // @ts-ignore
                  userData?.email.slice(0, 1).toUpperCase()
              }
            </Avatar>
          </StyledBadge>
        ) : (
          <IconButton sx={{ p: 0 }} size="large">
            <AccountCircleIcon />
          </IconButton>
        )}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleLoginAndOut}>
          {user ? "Logout" : "Login"}
        </MenuItem>
        <MenuItem onClick={handleMyAccount}>My account</MenuItem>
      </Menu>
    </div>
  );
}
