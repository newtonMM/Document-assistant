import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { logOutService } from "@/lib/thunks/auth";
import moment from "moment";

const IsAuth = () => {
  const { token } = useAppSelector((state) => state.Authentication);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const payload = jwtDecode(token);
    if (!payload) {
      navigate("/login");
      return;
    }

    if (moment.unix(payload.exp!).isBefore(moment())) {
      dispatch(logOutService());
      navigate("/login");
      return;
    }
  }, [token, navigate, dispatch]);

  return null;
};

export default IsAuth;
