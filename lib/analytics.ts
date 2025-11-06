"use client";

import ReactGA from "react-ga4";

export const initGA = () => {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (gaId) {
    ReactGA.initialize(gaId);
  }
};

export const logPageView = (url: string) => {
  ReactGA.send({ hitType: "pageview", page: url });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
