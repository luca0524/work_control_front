import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link  from 'next/link';

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
    onSignUp ?: (userdata:any ) => void
  }

const AuthRegister = ({ title, subtitle, subtext , onSignUp}: registerType) => {
    const [username, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    return (
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box>
            <Stack mb={3}>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='name' mb="5px">Name</Typography>
                <CustomTextField id="name" variant="outlined" fullWidth onChange={(e) => setName(e.target.value)} />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                <CustomTextField id="email" variant="outlined" fullWidth onChange={(e) => setEmail(e.target.value)} />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                <CustomTextField id="password" variant="outlined" type="password" fullWidth onChange={(e) => setPassword(e.target.value)} />
            </Stack>
            {onSignUp && <Button color="primary" variant="contained" size="large" fullWidth  onClick={() => onSignUp({username, email, password})}>
                Sign Up
            </Button>}
        </Box>
        {subtitle}
    </>
);}

export default AuthRegister;
