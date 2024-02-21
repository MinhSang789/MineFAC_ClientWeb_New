import { useEffect, useState } from "react";
import PaymentMethod from "services/paymentMethod";

export const PAYMENT_METHOD_TYPE = {
  bank: 0,
};

const usePaymentMethods = (paymentMethodType = 0) => {
  const [paymentMethods, setPaymentMethods] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PaymentMethod.getList({
      filter: {
        paymentMethodType,
      },
    }).then((response) => {
      setPaymentMethods([...response?.data?.data]);
      setLoading(false);
    });
  }, []);

  return { data: paymentMethods, loading };
};

export { usePaymentMethods };
