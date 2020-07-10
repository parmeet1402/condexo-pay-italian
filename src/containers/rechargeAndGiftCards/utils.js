import { isEmpty } from 'lodash';

import images from '../../assets/icons';
import {
  epayDigi,
  epayFastCard,
  epayHo,
  epayIliad,
  epayKena,
  epayLycaMobile,
  epayPosteMobile,
} from '../../assets/images';

export const getAmounts = (selectedOperator, operators) => {
  return operators.find((operator) => operator.name === selectedOperator)
    .amounts;
};

export const getMainBrands = (operators) => {
  if (!isEmpty(operators)) {
    return operators.filter(
      (operator) => availableOperators.indexOf(operator.name) < 4
    );
  }
};

export const getOtherBrands = (operators) => {
  if (!isEmpty(operators)) {
    return operators.filter(
      (operator) => availableOperators.indexOf(operator.name) > 3
    );
  }
};

export const getOperators = (operators) => {
  if (!isEmpty(operators)) {
    return operators
      .map((operator) => {
        if (availableOperators.includes(operator.supplier)) {
          return {
            name: operator.supplier,
            amounts: getAmountAndEan(operator),
            icon: icons[operator.supplier],
          };
        }
        return [];
      })
      .filter((operator) => operator.name);
  }
};

const getAmountAndEan = (operator) => {
  return operator.products
    .map((product) => {
      return {
        value: parseInt(product.faceValue),
        eanNo: product.eanNo,
        productName: product.product,
      };
    })
    .sort((prev, next) => {
      return prev.value > next.value ? 1 : -1;
    });
};

export const icons = {
  TIM: images.tim,
  WIND: images.wind,
  VODAFONE: images.vodafone,
  ILIAD: epayIliad,
  HO: epayHo,
  DigiMobil: epayDigi,
  Fastweb: epayFastCard,
  LYCAMOBILE: epayLycaMobile,
  POSTEMOBILE: epayPosteMobile,
  KENA: epayKena,
};

const availableOperators = [
  'VODAFONE',
  'TIM',
  'WIND',
  'ILIAD',
  'HO',
  'DigiMobil',
  'Fastweb',
  'LYCAMOBILE',
  'POSTEMOBILE',
  'KENA',
];
