import AuthenticatedLayout from '../components/AuthenticatedLayout';
import Link from 'next/link';

export default function ProductsPage() {
  return (
    <AuthenticatedLayout>
      <Link href={'/products/add'}>Add New Product</Link>
    </AuthenticatedLayout>
  );
}