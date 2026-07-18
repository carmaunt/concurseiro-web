"use client";

import { useEffect } from "react";
import { trackPortalLanding } from "@/services/productAnalytics";

export function PortalAnalytics() {
  useEffect(() => {
    trackPortalLanding();
  }, []);

  return null;
}
