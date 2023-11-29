import React from 'react'
import * as Sc from './styles';

export default function Error() {
  return (
    <Sc.ContainerError>
      <Sc.Err>
        Error 404
      </Sc.Err>
      <Sc.ErrMsg>
        Página não encontrada
      </Sc.ErrMsg>
    </Sc.ContainerError>
  )
}