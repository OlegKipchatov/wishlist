'use client'

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';

type Props = {
    title: string,
    show: boolean,
    onClose: () => void,
    children: any,
}

export default function Popup(props: Props) {
    const { show, title, onClose, children } = props;

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog onClose={onClose} as="div" className="z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 backdrop-blur-md z-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto z-50">
                    <div className="fixed sm:relative flex w-full min-h-full items-end sm:items-center justify-center sm:p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="translate-y-full sm:translate-y-0 sm:opacity-0 sm:scale-75"
                            enterTo="translate-y-0 sm:opacity-100 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="translate-y-0 sm:opacity-100 sm:scale-100"
                            leaveTo="translate-y-full sm:translate-y-0 sm:opacity-0 sm:scale-75"
                        >
                            <Dialog.Panel className="flex gap-4 flex-col w-full sm:max-w-md transform overflow-hidden rounded-t-2xl sm:rounded-2xl bg-neutral-0 p-6 border border-neutral-200 sm:shadow-2xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-foreground flex justify-between items-center">
                                    {title}
                                    <button onClick={onClose} className="inline-block btn-neutral btn-focus rounded-lg text-sm p-2">
                                        <XMarkIcon width={24} height={24} />
                                    </button>
                                </Dialog.Title>
                                <hr className="h-px bg-neutral-200 border-0"></hr>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
