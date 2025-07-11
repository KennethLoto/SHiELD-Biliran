import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Municipalities',
        href: '/dashboard',
    },
];

type Municipality = {
    id: string;
    code: string;
    municipality: string;
};

interface Props {
    municipalities: Municipality[];
}

export default function Index({ municipalities = [] }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="container mx-auto rounded-xl border p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Code</TableHead>
                                <TableHead>Municipality</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {municipalities.length > 0 ? (
                                municipalities.map((municipality, i) => (
                                    <TableRow key={`${municipality.id}-${i}`}>
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{municipality.code}</TableCell>
                                        <TableCell>{municipality.municipality}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">
                                        No municipalities found.
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
