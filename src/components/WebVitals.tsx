"use client";

import { useReportWebVitals } from "next/web-vitals";
import { reportWebVital } from "@/services/telemetry";

export function WebVitals() {
  useReportWebVitals((metric) => {
    reportWebVital({
      id: metric.id,
      name: metric.name,
      value: metric.value,
      delta: metric.delta,
      rating: metric.rating,
      navigationType: metric.navigationType,
    });
  });

  return null;
}
