import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

export default function withAuth(Component: React.FC) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      } else {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
        if (decoded) {
          setIsAuthenticated(true);
        } else {
          router.push('/login');
        }
      }
    }, []);

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
};
}
