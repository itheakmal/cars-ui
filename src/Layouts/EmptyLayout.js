import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const EmptyLayout = () => {
  const navigate = useNavigate();
  const authLogin = localStorage.getItem("token")

  if (authLogin === undefined || authLogin === null) {
    return <Outlet />;
  } else {
    return navigate("/", { replace: true })
  }

};

export default EmptyLayout;
