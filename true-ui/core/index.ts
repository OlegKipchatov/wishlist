import React, { ReactElement, cloneElement, Fragment, Children } from "react";

export const getChildPropsByType = <T>(children: React.ReactNode, component: unknown): T => {
    const result = Children.toArray(children).filter((child) => {
        const listPath = child.type._payload.value as string[];
        const childName = listPath[listPath.length - 1];
        
        if(childName === component.name) {
            return true;
        }

        return false;
    })

    if(result) {
        return result[0].props as T;
    }

    return Object.create(null);
}
