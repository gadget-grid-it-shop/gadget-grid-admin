'use server';

import { cookies } from 'next/headers';

export const clearCookie = () => {
  const cookieStore = cookies();
  cookieStore.delete('refreshToken');
};
