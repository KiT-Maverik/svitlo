'use client';

import { useId, useState, type FormEvent } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

/**
 * UI-only account cabinet prototype.
 * No authentication, storage, network requests or password changes happen here.
 * Hosts supply the selected locale's labels and their own identity data when this
 * prototype is eventually connected to an account service.
 */
export type CabinetTab = 'profile' | 'security' | 'accounts';

export type CabinetProfile = {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
  avatarId: string;
  email: string;
};

export type CabinetAvatar = {
  id: string;
  label: string;
  symbol: string;
  background: string;
};

export type CabinetAdditionalAccount = {
  id: string;
  displayName: string;
  subtitle: string;
  avatarId: string;
  role: 'owner' | 'learner' | 'other';
};

export type UserCabinetMessages = {
  title: string;
  subtitle: string;
  demoBadge: string;
  demoDescription: string;
  navigationLabel: string;
  tabs: Record<CabinetTab, string>;
  profileTitle: string;
  profileDescription: string;
  avatarTitle: string;
  avatarDescription: string;
  chooseAvatar: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  saveProfile: string;
  profilePreviewNotice: string;
  securityTitle: string;
  securityDescription: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  changePassword: string;
  passwordMismatch: string;
  passwordTooShort: string;
  passwordDemoNotice: string;
  accountsTitle: string;
  accountsDescription: string;
  currentAccount: string;
  noAdditionalAccounts: string;
  accountRoles: Record<CabinetAdditionalAccount['role'], string>;
};

export type UserCabinetProps = {
  profile: CabinetProfile;
  additionalAccounts: readonly CabinetAdditionalAccount[];
  avatars: readonly CabinetAvatar[];
  messages: UserCabinetMessages;
  initialTab?: CabinetTab;
};

function ProfileAvatar({
  avatar,
  displayName,
  size,
}: {
  avatar?: CabinetAvatar;
  displayName: string;
  size: number;
}) {
  return (
    <Avatar
      sx={{
        width: size,
        height: size,
        bgcolor: avatar?.background ?? 'primary.light',
        color: 'text.primary',
        fontSize: size / 2.1,
        fontWeight: 700,
        border: '2px solid',
        borderColor: 'background.paper',
        boxShadow: 1,
      }}
    >
      {avatar?.symbol || displayName.charAt(0).toLocaleUpperCase() || <AccountCircleOutlinedIcon />}
    </Avatar>
  );
}

export default function UserCabinet({
  profile,
  additionalAccounts,
  avatars,
  messages,
  initialTab = 'profile',
}: UserCabinetProps) {
  const tabsId = useId();
  const [tab, setTab] = useState<CabinetTab>(initialTab);
  const [savedProfile, setSavedProfile] = useState<CabinetProfile>(profile);
  const [draft, setDraft] = useState<CabinetProfile>(profile);
  const [profileNotice, setProfileNotice] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordNotice, setPasswordNotice] = useState<'mismatch' | 'short' | 'demo' | null>(null);

  const avatarById = (id: string) => avatars.find(option => option.id === id);
  const changeTab = (next: CabinetTab) => {
    setTab(next);
    // Never retain even demo password input while browsing other sections.
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordNotice(null);
  };

  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = {
      ...draft,
      displayName: draft.displayName.trim(),
      firstName: draft.firstName.trim(),
      lastName: draft.lastName.trim(),
    };
    if (!next.displayName || !next.firstName || !next.lastName) return;
    setDraft(next);
    setSavedProfile(next);
    setProfileNotice(true);
  };

  const changePassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword.length < 8) {
      setPasswordNotice('short');
    } else if (newPassword !== confirmPassword) {
      setPasswordNotice('mismatch');
    } else {
      // This is deliberately a visual preview, not a simulated successful password update.
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordNotice('demo');
    }
  };

  return (
    <Box sx={{ minHeight: '100%', bgcolor: 'background.default', color: 'text.primary' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 5 }, px: { xs: 2, sm: 3 } }}>
        <Stack spacing={3}>
          <Box>
            <Stack direction="row" alignItems="center" gap={1.5} flexWrap="wrap">
              <Typography component="h1" variant="h4" fontWeight={800}>
                {messages.title}
              </Typography>
              <Chip label={messages.demoBadge} size="small" variant="outlined" color="warning" />
            </Stack>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.75 }}>
              {messages.subtitle}
            </Typography>
          </Box>

          <Card variant="outlined" sx={{ borderRadius: 4, overflow: 'visible' }}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3 }, '&:last-child': { pb: { xs: 2.5, sm: 3 } } }}>
              <Stack direction="row" alignItems="center" gap={2.5} flexWrap="wrap">
                <ProfileAvatar avatar={avatarById(savedProfile.avatarId)} displayName={savedProfile.displayName} size={80} />
                <Box sx={{ minWidth: 0 }}>
                  <Typography component="h2" variant="h5" fontWeight={750} sx={{ overflowWrap: 'anywhere' }}>
                    {savedProfile.displayName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'anywhere' }}>
                    {savedProfile.email}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Alert severity="info" variant="outlined">
            <Typography variant="body2">{messages.demoDescription}</Typography>
          </Alert>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tab}
              onChange={(_event, value: CabinetTab) => changeTab(value)}
              aria-label={messages.navigationLabel}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab id={`${tabsId}-profile`} aria-controls={`${tabsId}-panel`} value="profile" icon={<AccountCircleOutlinedIcon />} iconPosition="start" label={messages.tabs.profile} />
              <Tab id={`${tabsId}-security`} aria-controls={`${tabsId}-panel`} value="security" icon={<LockOutlinedIcon />} iconPosition="start" label={messages.tabs.security} />
              <Tab id={`${tabsId}-accounts`} aria-controls={`${tabsId}-panel`} value="accounts" icon={<GroupsOutlinedIcon />} iconPosition="start" label={messages.tabs.accounts} />
            </Tabs>
          </Box>

          <Box id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-${tab}`}>
            {tab === 'profile' && (
              <Card variant="outlined" sx={{ borderRadius: 4 }}>
                <CardContent sx={{ p: { xs: 2.5, sm: 4 }, '&:last-child': { pb: { xs: 2.5, sm: 4 } } }}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography component="h2" variant="h5" fontWeight={700}>{messages.profileTitle}</Typography>
                      <Typography color="text.secondary" variant="body2">{messages.profileDescription}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography component="h3" variant="subtitle1" fontWeight={700}>{messages.avatarTitle}</Typography>
                      <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>{messages.avatarDescription}</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                        {avatars.map(option => {
                          const selected = draft.avatarId === option.id;
                          return (
                            <ButtonBase
                              key={option.id}
                              aria-label={`${messages.chooseAvatar}: ${option.label}`}
                              aria-pressed={selected}
                              onClick={() => {
                                setDraft(previous => ({ ...previous, avatarId: option.id }));
                                setProfileNotice(false);
                              }}
                              sx={{
                                p: 1.25,
                                border: 2,
                                borderColor: selected ? 'primary.main' : 'divider',
                                borderRadius: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0.75,
                                minWidth: 88,
                                position: 'relative',
                                '&:focus-visible': { outline: '3px solid', outlineColor: 'primary.main', outlineOffset: 2 },
                              }}
                            >
                              <ProfileAvatar avatar={option} displayName={draft.displayName} size={54} />
                              <Typography variant="caption" fontWeight={selected ? 700 : 400}>{option.label}</Typography>
                              {selected && <CheckCircleRoundedIcon aria-hidden="true" color="primary" sx={{ position: 'absolute', insetBlockStart: 2, insetInlineEnd: 2, fontSize: 18 }} />}
                            </ButtonBase>
                          );
                        })}
                      </Box>
                    </Box>
                    <Box component="form" onSubmit={saveProfile} noValidate={false}>
                      <Stack spacing={2.5}>
                        <TextField
                          fullWidth required
                          label={messages.displayName}
                          name="displayName"
                          value={draft.displayName}
                          onChange={event => { setDraft(previous => ({ ...previous, displayName: event.target.value })); setProfileNotice(false); }}
                        />
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                          <TextField
                            fullWidth required
                            label={messages.firstName}
                            name="firstName"
                            value={draft.firstName}
                            onChange={event => { setDraft(previous => ({ ...previous, firstName: event.target.value })); setProfileNotice(false); }}
                          />
                          <TextField
                            fullWidth required
                            label={messages.lastName}
                            name="lastName"
                            value={draft.lastName}
                            onChange={event => { setDraft(previous => ({ ...previous, lastName: event.target.value })); setProfileNotice(false); }}
                          />
                        </Box>
                        <TextField fullWidth disabled label={messages.email} value={savedProfile.email} />
                        <Box>
                          <Button type="submit" variant="contained" startIcon={<SaveOutlinedIcon />}>
                            {messages.saveProfile}
                          </Button>
                        </Box>
                        {profileNotice && <Alert severity="info" role="status">{messages.profilePreviewNotice}</Alert>}
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            )}

            {tab === 'security' && (
              <Card variant="outlined" sx={{ borderRadius: 4 }}>
                <CardContent sx={{ p: { xs: 2.5, sm: 4 }, '&:last-child': { pb: { xs: 2.5, sm: 4 } } }}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography component="h2" variant="h5" fontWeight={700}>{messages.securityTitle}</Typography>
                      <Typography color="text.secondary" variant="body2">{messages.securityDescription}</Typography>
                    </Box>
                    <Divider />
                    <Box component="form" onSubmit={changePassword} sx={{ maxWidth: 520 }}>
                      <Stack spacing={2.5}>
                        <TextField
                          fullWidth required type="password" autoComplete="current-password"
                          label={messages.currentPassword} value={currentPassword}
                          onChange={event => { setCurrentPassword(event.target.value); setPasswordNotice(null); }}
                        />
                        <TextField
                          fullWidth required type="password" autoComplete="new-password"
                          label={messages.newPassword} value={newPassword}
                          onChange={event => { setNewPassword(event.target.value); setPasswordNotice(null); }}
                        />
                        <TextField
                          fullWidth required type="password" autoComplete="new-password"
                          label={messages.confirmPassword} value={confirmPassword}
                          onChange={event => { setConfirmPassword(event.target.value); setPasswordNotice(null); }}
                        />
                        <Box>
                          <Button type="submit" variant="contained" startIcon={<LockOutlinedIcon />}>
                            {messages.changePassword}
                          </Button>
                        </Box>
                        {passwordNotice && (
                          <Alert role={passwordNotice === 'demo' ? 'status' : 'alert'} severity={passwordNotice === 'demo' ? 'info' : 'error'}>
                            {passwordNotice === 'short'
                              ? messages.passwordTooShort
                              : passwordNotice === 'mismatch'
                                ? messages.passwordMismatch
                                : messages.passwordDemoNotice}
                          </Alert>
                        )}
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            )}

            {tab === 'accounts' && (
              <Card variant="outlined" sx={{ borderRadius: 4 }}>
                <CardContent sx={{ p: { xs: 2.5, sm: 4 }, '&:last-child': { pb: { xs: 2.5, sm: 4 } } }}>
                  <Stack spacing={2.5}>
                    <Box>
                      <Typography component="h2" variant="h5" fontWeight={700}>{messages.accountsTitle}</Typography>
                      <Typography color="text.secondary" variant="body2">{messages.accountsDescription}</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
                      <Card variant="outlined" sx={{ borderRadius: 3, bgcolor: 'action.hover' }}>
                        <CardContent>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <ProfileAvatar avatar={avatarById(savedProfile.avatarId)} displayName={savedProfile.displayName} size={52} />
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                              <Typography fontWeight={700} sx={{ overflowWrap: 'anywhere' }}>{savedProfile.displayName}</Typography>
                              <Typography color="text.secondary" variant="body2">{messages.accountRoles.owner}</Typography>
                            </Box>
                            <Chip size="small" label={messages.currentAccount} color="primary" variant="outlined" />
                          </Stack>
                        </CardContent>
                      </Card>
                      {additionalAccounts.map(account => (
                        <Card key={account.id} variant="outlined" sx={{ borderRadius: 3 }}>
                          <CardContent>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <ProfileAvatar avatar={avatarById(account.avatarId)} displayName={account.displayName} size={52} />
                              <Box sx={{ minWidth: 0 }}>
                                <Typography fontWeight={700} sx={{ overflowWrap: 'anywhere' }}>{account.displayName}</Typography>
                                <Typography color="text.secondary" variant="body2">{account.subtitle}</Typography>
                                <Typography color="text.secondary" variant="caption">{messages.accountRoles[account.role]}</Typography>
                              </Box>
                            </Stack>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                    {additionalAccounts.length === 0 && (
                      <Typography color="text.secondary">{messages.noAdditionalAccounts}</Typography>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
