import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Badge,
  useMediaQuery,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon
} from '@mui/icons-material';

const DashboardHeader = ({ isDark, toggleTheme, userName = "JD" }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationsAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        backgroundColor: isDark ? 'background.paper' : 'background.paper',
        color: isDark ? 'grey.100' : 'text.primary',
        borderRadius: 0,
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ px: isMobile ? 1 : 3 }}>
        {/* Left section with profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <IconButton
            size="large"
            edge="start"
            onClick={handleProfileMenuOpen}
            sx={{ mr: 1 }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'primary.main',
                fontSize: 18,
              }}
            >
              {userName}
            </Avatar>
          </IconButton>
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            component="div"
            sx={{
              fontWeight: 700,
              ml: 2,
              borderLeft: 1,
              borderColor: 'divider',
              pl: 2,
              fontSize: isMobile ? "1.1rem" : "1.5rem",
            }}
          >
            AURORA
          </Typography>
        </Box>

        {/* Right section with buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Theme toggle icon */}
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            sx={{
              mr: isMobile ? 0.5 : 2,
              bgcolor: isDark ? 'grey.900' : 'grey.200',
              borderRadius: 2,
              transition: 'background 0.3s',
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* Notifications button */}
          <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            onClick={handleNotificationsOpen}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>

        {/* Profile menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 160,
            }
          }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>

        {/* Notifications menu */}
        <Menu
          anchorEl={notificationsAnchorEl}
          open={Boolean(notificationsAnchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 260,
            }
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <Box>
              <Typography variant="body2">Project update completed</Typography>
              <Typography variant="caption" color="text.secondary">10 minutes ago</Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Box>
              <Typography variant="body2">New message from team</Typography>
              <Typography variant="caption" color="text.secondary">1 hour ago</Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Box>
              <Typography variant="body2">System backup scheduled</Typography>
              <Typography variant="caption" color="text.secondary">Yesterday</Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;