import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';

type Disease = {
    id: string;
    name: string;
    short_description: string;
};

interface Props {
    diseases: Disease[];
    onEdit: (disease: Disease) => void;
    onDelete: (disease: Disease) => void;
}

export function DiseaseTable({ diseases, onEdit, onDelete }: Props) {
    return (
        <div className="container mx-auto rounded-xl border p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Short Description</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {diseases.length > 0 ? (
                        diseases.map((disease, i) => (
                            <TableRow key={disease.id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{disease.name}</TableCell>
                                <TableCell>{disease.short_description}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="outline" onClick={() => onEdit(disease)}>
                                            <Edit />
                                            Edit
                                        </Button>
                                        <Button variant="destructive" onClick={() => onDelete(disease)}>
                                            <Trash2 />
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No diseases found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
