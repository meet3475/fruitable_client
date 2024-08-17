import React from 'react';
import { PrimaryButton, SecondaryButton} from './Button.style';

function Button({ children, btnType = "Primary",  btnDisable=false, ...rest }) {

  console.log(btnType);

  const checkButton = () => {
    switch (btnType) {
      case "Primary":
        return PrimaryButton;

      case "Secondary":
        return SecondaryButton;

      default:
        return PrimaryButton;
    }
  }

  const CustomButton = checkButton();

  return (
      <CustomButton disabled={btnDisable} {...rest}>
        {children}
      </CustomButton>
  );
}

export default Button;