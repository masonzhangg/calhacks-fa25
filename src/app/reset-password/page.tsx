'use client';
import React, { useState } from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useAuth, useSignIn } from '@clerk/nextjs';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Loader from '../components/Loader';

const ResetPassword: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return <Loader />;
  }

  if (isSignedIn) {
    router.push('/');
    return null;
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      setSuccessfulCreation(true);
      setErrorMessage('');
    } catch (error: any) {
      setErrorMessage(error?.errors?.[0]?.longMessage || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        setErrorMessage('');
        router.push('/');
      } else {
        setErrorMessage('Invalid verification code or password.');
      }
    } catch (error: any) {
      setErrorMessage(error?.errors?.[0]?.longMessage || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'rgba(240, 240, 240, 0.9)',
        padding: '2rem',
        color: 'black',
      }}
    >
      {!successfulCreation ? (
        <Box sx={{ width: '100%', maxWidth: '400px', textAlign: 'left' }}>
          <Typography
            variant="h4"
            sx={{
              marginBottom: '1rem',
              fontWeight: 'bold',
              fontFamily: 'Inter',
              fontSize: '1.5rem',
            }}
          >
            Verify Your Email
          </Typography>
          <Divider sx={{ width: '100%', marginBottom: '1rem' }} />
          <form onSubmit={handleEmailSubmit}>
            <Box sx={{ marginBottom: '1rem' }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
              >
                Email
              </Typography>
              <TextField
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    height: '2rem',
                  },
                  '& :-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    transition: 'background-color 5000s ease-in-out 0s',
                  },
                }}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{
                padding: '0.75rem',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: '8px',
                height: '2.5rem',
                color: 'white',
                background: 'linear-gradient(to right bottom, #8c52ff, #C17BC1)',
                ':disabled': {
                  color: 'white',
                },
              }}
            >
              {loading ? 'Processing...' : 'Verify Email'}
            </Button>
            {errorMessage && (
              <Typography
                variant="body2"
                color="error"
                sx={{ textAlign: 'center', marginTop: '0.5rem' }}
              >
                {errorMessage}
              </Typography>
            )}
          </form>
        </Box>
      ) : (
        <Box sx={{ width: '100%', maxWidth: '400px', textAlign: 'left' }}>
          <Typography
            variant="h4"
            sx={{
              marginBottom: '1rem',
              fontWeight: 'bold',
              fontFamily: 'Inter',
              fontSize: '1.5rem',
            }}
          >
            Reset Your Password
          </Typography>
          <Divider sx={{ width: '100%', marginBottom: '1rem' }} />
          <form onSubmit={handleResetSubmit}>
            <Box sx={{ marginBottom: '1rem' }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
              >
                New Password
              </Typography>
              <TextField
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    height: '2rem',
                  },
                  '& :-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    transition: 'background-color 5000s ease-in-out 0s',
                  },
                }}
              />
            </Box>
            <Box sx={{ marginBottom: '1rem' }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
              >
                Verification Code
              </Typography>
              <TextField
                name="code"
                type="text"
                variant="outlined"
                fullWidth
                value={code}
                onChange={(e) => setCode(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    height: '2rem',
                  },
                  '& :-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px transparent inset',
                    transition: 'background-color 5000s ease-in-out 0s',
                  },
                }}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{
                padding: '0.75rem',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: '8px',
                height: '2.5rem',
                background: 'linear-gradient(to right bottom, #8c52ff, #C17BC1)',
                color: 'white',
                ':disabled': {
                  color: 'white',
                },
              }}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </Button>
            {errorMessage && (
              <Typography
                variant="body2"
                color="error"
                sx={{ textAlign: 'center', marginTop: '0.5rem' }}
              >
                {errorMessage}
              </Typography>
            )}
          </form>
        </Box>
      )}
    </Box>
  );
};

export default ResetPassword;
