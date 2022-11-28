import React, { FC, useEffect, useState } from 'react';
import { OrderFullInfo } from '../order-full-info/order-full-info';
import { useAppDispatch, useSelector } from '../../utils/hooks';
import { feedWsConnectionDisconnect, feedWsConnectionStart } from '../../services/actions/feed-ws.actions';
import { OrderInterface } from '../../interfaces/models/order.interface';
import { useParams } from 'react-router-dom';
import { Modal } from '../modal/modal';
import { ordersUrl } from '../../utils/app.constants';

export interface FeedOrderFullInfoProps {
  isModal?: boolean;
  onCloseDetails?: () => void;
}

export const FeedOrderFullInfo: FC<FeedOrderFullInfoProps> = ({ isModal, onCloseDetails }) => {
  const { feedId } = useParams();

  const dispatch = useAppDispatch();
  const { orders } = useSelector((state) => state.wsFeed);
  const [order, setOrder] = useState<OrderInterface>();
  useEffect(() => {
    dispatch(feedWsConnectionStart(ordersUrl));
    return () => {
      dispatch(feedWsConnectionDisconnect());
    };
  }, [dispatch]);

  useEffect(() => {
    const order = orders?.orders.find((o) => o._id === feedId);
    setOrder(order);
  }, [feedId, orders]);

  return (
    <>
      {order &&
        (!isModal ? (
          <OrderFullInfo
            {...order}
            pageCentered={true}
          />
        ) : (
          <Modal
            onClose={onCloseDetails as () => void}
            title={`#${order.number}`}>
            <OrderFullInfo
              {...order}
              pageCentered={false}
            />
          </Modal>
        ))}
    </>
  );
};
