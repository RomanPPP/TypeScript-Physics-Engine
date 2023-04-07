import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CssBaseline from "@mui/material/CssBaseline";
import ConfigDashboard from "./ConfigDashboard";
import DebugPanel from "./DebugPanel";
import { Card } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Wrapper = styled(Card)({
  position: "fixed",
  top: "20px",
  right: "20px",
  fontSize: "0.5em",
});

const DashBoardWrapper = styled(Card)({
  position: "fixed",
  top: "20px",
  right: "20px",
  fontSize: "0.5em",
});

const DebugWrapper = styled("div")({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  fontSize: "0.5em",
});

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function CustomizedMenus({ debugData, configData }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showDashboard, setShowDashboard] = React.useState<boolean>(false);
  const [showDebug, setShowDebug] = React.useState<boolean>(false);


  const toggleDashboard = () => setShowDashboard(!showDashboard);
  const toggleDebug = () => setShowDebug(!showDebug);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.nativeEvent.stopPropagation();
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Options
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={toggleDashboard} disableRipple>
            <EditIcon />
            Config
          </MenuItem>
          <MenuItem onClick={toggleDebug} disableRipple>
            <FileCopyIcon />
            Debug
          </MenuItem>
        </StyledMenu>
      </div>
      <Wrapper>
        {showDashboard ? <ConfigDashboard config={configData} /> : null}
        {showDebug ? <DebugPanel debugData={debugData} /> : null}
      </Wrapper>
    </ThemeProvider>
  );
}
