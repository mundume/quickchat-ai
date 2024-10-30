import React from "react";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(
  () => import("../components/snack-chat-preview-ui"),
  {
    ssr: false,
  }
);

const Page = () => {
  return <DynamicComponent />;
};

export default Page;
