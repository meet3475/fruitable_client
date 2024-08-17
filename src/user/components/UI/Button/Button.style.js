import styled from "styled-components";

const BaseButton = styled.button`
    transition: 0.5s;
    cursor: pointer;
    font-weight: 600;
    border-radius: 50rem !important;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
    margin-left: 1.5rem !important;
    margin-bottom: 1.5rem !important;
    display: inline-block;
    line-height: 1.5;
    text-align: center;
    vertical-align: middle;
    -moz-user-select: none;
    user-select: none;
    font-size: 1rem;

`

export const PrimaryButton = styled(BaseButton)`
    color: #81c408 !important;
    border-color: #ffb524 !important;
    background-color: ${props => props.disabled ? 'gray' : 'rgba(0,0,0,0)'};
    text-transform: uppercase !important;

    &:hover {
        background: ${props => props.disabled ? 'gray' : 'var(--bs-secondary)'}  !important;
        color: var(--bs-white) !important;
    }
`

export const SecondaryButton = styled(BaseButton)`
    color: rgb(255, 255, 255) !important;
    border-color: rgb(255, 181, 36) !important;
    background-color: rgb(129, 196, 8);

    &:hover {
        background: var(--bs-secondary) !important;
        color: var(--bs-white) !important;
    }
`
