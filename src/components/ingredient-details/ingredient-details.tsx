import React, { MouseEventHandler } from 'react';
import { Modal } from '../modal/modal';
import { IngredientInterface } from '../../interfaces/ingredient.interface';

interface IngredientDetailsProps {
  onClose: MouseEventHandler<HTMLElement>;
  ingredient: IngredientInterface;
}

export function IngredientDetails(props: IngredientDetailsProps) {
  return (
    <Modal
      onClose={props.onClose}
      title="Детали ингредиента">
      <h2>{props.ingredient.name}</h2>
    </Modal>
  );
}
