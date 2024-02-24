'use client'

import React, { PropsWithChildren, ChangeEvent } from "react";
import InputLabel, { LabelProps } from './InputLabel';
import InputError, { ErrorProps } from './InputError';
import { getChildPropsByType } from "../core";

type InputProps = {
    status?: '' | 'success' | 'error',
    placeholder?: string,
    isRequired?: boolean,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
} & PropsWithChildren;


const createClasses = (label: LabelProps, input: InputProps) => {
    const classes = {
        root: '',
        input: '',
    };

    classes.root += ' ' + (label.position === 'left' ? 'flex-row' : 'flex-col')

    if(input.status === 'success') {
        classes.input += ' border-green-300 focus:ring-2 focus:ring-green-300';
    } else if(input.status === 'error') {
        classes.input += ' border-red-300 focus:ring-2 focus:ring-red-300';
    }

    return classes;
};

const Input = (props: InputProps) => {
    const { status, isRequired, onChange, children } = props;

    const labelProps = getChildPropsByType<LabelProps>(children, InputLabel);
    const inputError = getChildPropsByType<ErrorProps>(children, InputError);

    const classes = createClasses(labelProps, props);

    return (
        <div className={'flex my-4 ' + classes.root}>
            <div className="mb-2">
                <InputLabel {...labelProps} />
                {isRequired && <span className="text-red-500 ml-1">*</span>}
            </div>
            <div>
                <input
                    className={"w-full p-2.5 rounded-lg border border-gray-100 dark:bg-gray-0 btn-focus" + classes.input}
                    name="email"
                    placeholder={props.placeholder}
                    required={isRequired}
                    onChange={onChange}
                />
                { status === 'error' && <InputError {...inputError} /> }
            </div>
        </div>
    );
}

export default Input;
export {
    InputLabel,
    InputError,
}
