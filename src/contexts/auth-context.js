import React, { createContext, useEffect, useMemo } from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/actions/user.action";

export const AuthContext = createContext();

AuthContext.displayName = "AuthContext";

export const ApplicationContext = memo(({ children, ...props }) => {
  const session = useSelector((state) => state.session);
  const userModel = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const configurations = useMemo(() => {
    return {
      user: userModel,
      isAuthenticated: session.isAuthenticated
      // isAdmin: session && session.authorization && session.authorization.role === "admin"
    };
  }, [session, userModel]);

  useEffect(() => {
    if (configurations.isAuthenticated) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, configurations.isAuthenticated]);

  return (
    <AuthContext.Provider value={configurations}>
      {typeof children === "function" ? children(configurations) : children}
    </AuthContext.Provider>
  );
});

export default ApplicationContext;
