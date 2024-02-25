export type BaseStatus = '' | 'error' | 'success';

export type StatusFormat = Exclude<BaseStatus, 'error'> | 'error-format' | 'approve-format';

export type StatusExist = Exclude<BaseStatus, 'error'> | 'error-exist';

export type Status = StatusFormat | StatusExist;
