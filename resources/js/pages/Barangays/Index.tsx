import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Barangays',
        href: '/barangays',
    },
];

type Barangay = {
    id: string;
    code: string;
    barangay: string;
    municipality: {
        id: string;
        municipality: string;
    };
};

interface Props {
    barangays: Barangay[];
}

export default function Index({ barangays = [] }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="container mx-auto rounded-xl border p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Municipality</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Barangay</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {barangays.length > 0 ? (
                                barangays.map((barangay, i) => (
                                    <TableRow key={barangay.id}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{barangay.municipality.municipality}</TableCell>
                                        <TableCell>{barangay.code}</TableCell>
                                        <TableCell>{barangay.barangay}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        No barangays found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
