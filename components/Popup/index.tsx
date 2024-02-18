'use client'

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CloseSvg from "@/svg/Close";

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
                            enterFrom="translate-y-full sm:opacity-0 sm:scale-95"
                            enterTo="translate-y-0 sm:opacity-100 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="translate-y-0 sm:opacity-100 sm:scale-100"
                            leaveTo="translate-y-full sm:opacity-0 sm:scale-95"
                        >
                            <Dialog.Panel className="flex gap-8 flex-col w-full sm:max-w-md transform overflow-hidden rounded-2xl bg-background border border-gray-800 sm:border-none p-6 shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-foreground flex justify-between items-center">
                                    {title}
                                    <button onClick={onClose} className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2">
                                        <CloseSvg />
                                    </button>
                                </Dialog.Title>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
