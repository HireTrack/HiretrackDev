import React from 'react';
import { Button, TextField } from '@radix-ui/themes';

const RegisterPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Register</h1>
      <TextField.Root style={{ margin: '10px', width: '250px' }}>
        <TextField.Input placeholder="Name" />
      </TextField.Root>
      <TextField.Root style={{ margin: '10px', width: '250px' }}>
        <TextField.Input placeholder="Email" />
      </TextField.Root>
      <TextField.Root style={{ margin: '10px', width: '250px' }}>
        <TextField.Input placeholder="Password" type="password" />
      </TextField.Root>
      <Button style={{ margin: '20px' }}>Register</Button>
    </div>
  );
};

export default RegisterPage;
