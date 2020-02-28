import React, { useState } from "react";

import StickieForm from "./StickieForm";
const ActionButton = () => {
  const [formStatus, setFormStatus] = useState(false);

  const list = false;

  const ButtonText = list ? "Add new column" : "Add new sticky";

  const openFrom = () => {
    setFormStatus(true);
  };

  if (formStatus) return <StickieForm />;

  return (
    <div onClick={() => openFrom()}>
      <p>{ButtonText}</p>
    </div>
  );
};

export default ActionButton;
