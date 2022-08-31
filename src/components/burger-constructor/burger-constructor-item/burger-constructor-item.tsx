import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useRef } from 'react';
import { ConstructorIngredientInterface } from '../../../interfaces/ingredient.interface';
import { useDrag, useDrop } from 'react-dnd';
import { DndIngredientType } from '../../../utils/app.types';
import styles from './burger-constructor-item.module.css';

export interface BurgerConstructorItemInterface extends ConstructorIngredientInterface {
  handleRemove?: () => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

interface DraggableItemInterface {
  id: string;
  index: number;
}

export function BurgerConstructorItem({
  constructorId,
  name,
  price,
  index,
  image,
  handleRemove,
  moveCard
}: BurgerConstructorItemInterface) {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    // Указываем тип получаемых элементов, чтобы dnd понимал,
    // в какой контейнер можно класть перетаскиваемый элемент, а в какой нельзя.
    // Элементы и контейнеры с разными типами не будут взаимодействовать
    accept: DndIngredientType.BETWEEN_BUNS,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    // Вызывается, когда перетаскиваемый элемент оказывается над ингредиентом,
    // индекс которого у нас задан в пропсах props.index
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      // Переопределяем индексы ингредиентов для удобства
      const dragIndex = (item as DraggableItemInterface).index;
      const hoverIndex = index;
      // Ничего не делаем, если ингредиент находится
      if (dragIndex === hoverIndex) {
        return;
      }
      // Определяем границы карточки ингредиента
      // @ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Определяем середину карточки по оси Y нашего ингредиента
      // В момент пересечения этой границы, перетаскиваемым ингредиентом
      // Мы будем менять их местами
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Получаем текущую позицию курсора,
      // относительно текущего контейнера
      const clientOffset = monitor.getClientOffset();
      // Вычисляем координаты курсора и координаты середины карточки
      // на которую мы навели наш перетаскиваемый ингредиент
      // @ts-ignore
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Условие для перетаскивании элементов сверху вниз
      // Если перетаскиваемый ингредиент пересекает середину
      // текущего ингредиента, то мы идем дальше и выполняем moveCard
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Условие для перетаскивании элементов снизу вверх
      // Происходит тоже самое что и выше, только в обратном порядке
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Выполняем наш коллбэк с перемещением карточек внутри массива
      moveCard(dragIndex, hoverIndex);
      // Это сделано для внутренней оптимизации библиотеки
      // для поиска и замены элементом
      (item as DraggableItemInterface).index = hoverIndex;
    }
  });
  // Задаем функционал перетаскивания для элементов внутри списка
  // ингредиентов заказа
  const [{ isDragging }, drag] = useDrag({
    type: DndIngredientType.BETWEEN_BUNS,
    item: () => ({ id: constructorId, index } as DraggableItemInterface),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  // Добавляем перетаскиваемому элементу прозрачность 0,
  // чтобы на его месте визуально появилось пустое пространство
  const opacity = isDragging ? 0 : 1;
  // Тут мы говорим что наш элемент и перетаскиваемый и бросаемый :)
  drag(drop(ref));
  // Прерываем базовую функция для onDrop
  // потому что браузер по умолчанию не сбрасывает наш элемент в контейнер
  const preventDefault = (e: any) => e.preventDefault();

  const draggableItemClassName = `${styles.draggableItem}`;

  return (
    <div
      ref={ref}
      style={{ opacity }}
      onDrop={preventDefault}
      data-handler-id={handlerId}
      className={draggableItemClassName}
      key={constructorId}>
      <DragIcon type="primary" />
      <ConstructorElement
        handleClose={handleRemove}
        text={name}
        price={price}
        thumbnail={image}
      />
    </div>
  );
}