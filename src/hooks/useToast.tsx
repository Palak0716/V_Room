import React from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setToasts } from '../app/slices/MeetingSlice';

export default function useToast() {
   const toasts = useAppSelector((vroom)=> vroom.meetings.toasts);
   const dispatch = useAppDispatch();
  const createToast = ({title, type}:{title:string; type:any}) => {
   dispatch(
      setToasts(
         toasts.concat({
            id: new Date().toISOString(),
            title,
            color: type,
         })
      )
   );
  };
   return [createToast];
}
