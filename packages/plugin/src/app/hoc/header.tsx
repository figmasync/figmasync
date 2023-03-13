import React from "react";
import Header from "../components/Header";

const withHeader = (Component: any) => {
  const Wrapper = (props: any) => {
    return (
      <>
        <Header />
        <Component {...props} />
      </>
    );
  };
  return Wrapper;
};

export default withHeader;
