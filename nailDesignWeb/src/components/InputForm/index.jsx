import React from 'react';
import { Controller } from 'react-hook-form';
import Input from '../Input';
import * as Sc from './styles';

export default function InputForm({
  control,
  name,
  error,
  label,
  defaultValue,
  ...rest
}) {
  return (
    <Sc.Container>
      <label hidden={!label}>{label}</label>
      <Controller
        control={control}
        render={({
          field: { onChange, value }
        }) => (
          <Input
            onChange={onChange}
            defaultValue={value}
            isValid={error}
            {...rest}
          />
        )}
        name={name}
      />
      {
        error && <Sc.ErrorMessage>{error}</Sc.ErrorMessage>
      }
    </Sc.Container>
  );
}
