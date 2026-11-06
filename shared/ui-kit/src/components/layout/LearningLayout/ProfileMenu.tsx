'use client';

import { useId, useState, type MouseEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import type { LearningLayout_Locale } from '../../../../data/locale/learningLayout';

/** Identity and session actions are supplied by a host, never implemented inside the UI Kit. */
export type LearningProfile = {
  id: string;
  displayName: string;
  avatarUrl?: string;
};

export type ProfileMenuProps = {
  messages: LearningLayout_Locale;
  profile?: LearningProfile;
  profiles?: readonly LearningProfile[];
  onProfileChange?: (profileId: string) => void;
  onLogout?: () => void;
  onSettings: () => void;
  onOpen?: () => void;
};

export default function ProfileMenu({
  messages,
  profile,
  profiles = [],
  onProfileChange,
  onLogout,
  onSettings,
  onOpen,
}: ProfileMenuProps) {
  const menuId = useId();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const isOpen = Boolean(anchor);
  const canSwitch = Boolean(onProfileChange && profiles.some(candidate => candidate.id !== profile?.id));

  const close = () => {
    setAnchor(null);
    setExpanded(false);
  };
  const open = (event: MouseEvent<HTMLElement>) => {
    if (isOpen) {
      close();
      return;
    }
    onOpen?.();
    setAnchor(event.currentTarget);
  };
  const selectProfile = (id: string) => {
    close();
    onProfileChange?.(id);
  };
  const showSettings = () => {
    close();
    onSettings();
  };
  const logout = () => {
    close();
    onLogout?.();
  };

  const displayName = profile?.displayName || messages.actions.profile;
  const avatar = (size: number) => (
    <Avatar
      src={profile?.avatarUrl}
      alt={profile?.avatarUrl ? displayName : undefined}
      sx={{ width: size, height: size, bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 700 }}
    >
      {profile?.displayName ? profile.displayName.slice(0, 1).toLocaleUpperCase() : <AccountCircleOutlinedIcon />}
    </Avatar>
  );

  return (
    <>
      <Tooltip title={messages.actions.profile}>
        <IconButton
          aria-label={messages.actions.profile}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={isOpen ? menuId : undefined}
          onClick={open}
          sx={{ p: 0.5 }}
        >
          {avatar(36)}
        </IconButton>
      </Tooltip>
      <Menu
        id={menuId}
        anchorEl={anchor}
        open={isOpen}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 280,
              maxWidth: 'calc(100vw - 24px)',
              borderRadius: 3,
              boxShadow: 8,
              border: 1,
              borderColor: 'divider',
            },
          },
          list: { 'aria-label': messages.actions.profile },
        }}
      >
        <Box sx={{ px: 3, pt: 2, pb: 2, display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 1 }}>
          {avatar(64)}
          <Typography component="span" variant="subtitle1" fontWeight={700} sx={{ overflowWrap: 'anywhere', textAlign: 'center' }}>
            {displayName}
          </Typography>
        </Box>
        <Divider />
        <MenuItem
          disabled={!canSwitch}
          aria-expanded={canSwitch ? expanded : undefined}
          aria-controls={canSwitch && expanded ? `${menuId}-profiles` : undefined}
          onClick={() => setExpanded(value => !value)}
          sx={{ py: 1.25 }}
        >
          <ListItemIcon><ManageAccountsOutlinedIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{messages.actions.switchProfile}</ListItemText>
          <ExpandMoreRoundedIcon fontSize="small" sx={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 180ms' }} />
        </MenuItem>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box id={`${menuId}-profiles`} role="group" aria-label={messages.actions.switchProfile}>
            {profiles.map(candidate => (
              <MenuItem
                key={candidate.id}
                disabled={!onProfileChange || candidate.id === profile?.id}
                selected={candidate.id === profile?.id}
                onClick={() => selectProfile(candidate.id)}
                sx={{ ps: 3 }}
              >
                <ListItemIcon>
                  <Avatar src={candidate.avatarUrl} sx={{ width: 28, height: 28, fontSize: 13 }}>
                    {candidate.displayName.slice(0, 1).toLocaleUpperCase()}
                  </Avatar>
                </ListItemIcon>
                <ListItemText>{candidate.displayName}</ListItemText>
                {candidate.id === profile?.id && <CheckRoundedIcon fontSize="small" />}
              </MenuItem>
            ))}
          </Box>
        </Collapse>
        <MenuItem onClick={showSettings} sx={{ py: 1.25 }}>
          <ListItemIcon><SettingsOutlinedIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{messages.settingsTitle}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem disabled={!onLogout} onClick={logout} sx={{ py: 1.25 }}>
          <ListItemIcon><LogoutRoundedIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{messages.actions.logout}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
