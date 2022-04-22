/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { SpinnerDotted } from 'spinners-react';
import { webchatProps } from '../../../WebChat/webchat.interface';

export const Confirmation: FC<webchatProps> = function () {
  return (
    <div className="confirmation__ewc-class">
      <h1>INICIANDO DERIVACION CON UNO DE NUESTROS AGENTES</h1>
      <MdOutlineSupportAgent size={50} />
      <SpinnerDotted size={100} thickness={100} speed={100} color="white" />
    </div>
  );
};
