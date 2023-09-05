import React from "react";
import { useParams } from "react-router-dom";

/**
 * This works as an HOC for passed component
 * and injects match.params prop into it
 */

const RouteWrapper = (props) => {
  // the Component props is the component the route renders
  const { Component } = props;

  // get matched params using hook
  const params = useParams();

  // inject params within 'match' object to make v5-compatible
  return <Component {...{ ...props, match: { params } }} />;
};

export default RouteWrapper;
