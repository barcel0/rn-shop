import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const ButtonHeaderCustom = props => {
  return <HeaderButton {...props} IconComponent={Ionicons} iconSize={32} color={'white'} />
}

export default ButtonHeaderCustom;