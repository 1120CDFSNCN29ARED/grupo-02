import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SearchIcon from "@material-ui/icons/Search";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ContactsIcon from "@material-ui/icons/Contacts";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PostAddIcon from "@material-ui/icons/PostAdd";

import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import TotalsRowContainer from '../ContentWrapper/TotalsRow/TotalsRowContainer'
import TablesContainer from '../ContentWrapper/Tables/TablesContainer'
import LastAndCategoryInformationContainer from '../ContentWrapper/LastCreatedRow/LastAndCategoryInformationContainer';
import UsersContainer from '../Users/UsersContainer';
import { Route } from "react-router";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	grow: {
		flexGrow: 1,
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}));
export default function Main() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	
	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="secondary">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label="show 11 new notifications" color="inherit">
					<Badge badgeContent={11} color="secondary">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						Real Cars
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
						/>
					</div>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<IconButton aria-label="show 4 new mails" color="inherit">
							<Badge badgeContent={4} color="secondary">
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton aria-label="show 17 new notifications" color="inherit">
							<Badge badgeContent={17} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				<List>
					<ListItem button>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary="Dashboard" />
					</ListItem>
				</List>
				<Divider />
				<List>
					{/* I did not manage ot implement this dynamically in SideBarItem due to the icons not passing as props */}
					<ListItem button>
						<ListItemIcon>
							<ContactsIcon />
						</ListItemIcon>
						<ListItemText primary="Users" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<PostAddIcon />
						</ListItemIcon>
						<ListItemText primary="Posts" />
					</ListItem>
				</List>
				<ListItem button>
					<ListItemIcon>
						<AttachMoneyIcon />
					</ListItemIcon>
					<ListItemText primary="Sales" />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<ShoppingCartIcon />
					</ListItemIcon>
					<ListItemText primary="Carts" />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<FavoriteIcon />
					</ListItemIcon>
					<ListItemText primary="Favourites" />
				</ListItem>
				<Divider />
				<List>
					{["Sub-Item 1", "Sub-Item 2", "Sub-Item 3"].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<TotalsRowContainer />
				<LastAndCategoryInformationContainer/>
				<TablesContainer category="users" />
				<TablesContainer category="posts" />
				<UsersContainer/>
			</main>
		</div>
	);
}