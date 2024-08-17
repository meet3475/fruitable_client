import React from 'react';
import { BaseInput, Spantext} from './input.styled';

function Input({ errorText, ...rest }) {
    return (
        <>
            <BaseInput {...rest} />

         <Spantext>
            {errorText}
         </Spantext>
        </>
    );
}

export default Input;