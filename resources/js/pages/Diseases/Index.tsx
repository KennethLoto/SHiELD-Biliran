import DeleteDialog from '@/components/CustomComponents/DeleteDialog';
import { DiseaseDialog } from '@/components/CustomComponents/Diseases/DiseaseDialog';
import { DiseaseTable } from '@/components/CustomComponents/Diseases/DiseaseTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Diseases',
        href: '/diseases',
    },
];

type Disease = {
    id: string;
    name: string;
    short_description: string;
};

interface Props {
    diseases: Disease[];
}

export default function Index({ diseases = [] }: Props) {
    const [diseaseDialogOpen, setDiseaseDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleAdd = () => {
        setSelectedDisease(null);
        setIsEditing(false);
        setDiseaseDialogOpen(true);
    };

    const handleEdit = (disease: Disease) => {
        setSelectedDisease(disease);
        setIsEditing(true);
        setDiseaseDialogOpen(true);
    };

    const handleDelete = (disease: Disease) => {
        setSelectedDisease(disease);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (selectedDisease) {
            setIsDeleting(true);
            router.delete(`/diseases/${selectedDisease.id}`, {
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setSelectedDisease(null);
                    setIsDeleting(false);
                },
                onError: () => {
                    setIsDeleting(false);
                },
                onFinish: () => {
                    setIsDeleting(false);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Diseases" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <div className="mb-4 flex justify-end">
                        <Button onClick={handleAdd}>
                            <PlusCircle />
                            Add
                        </Button>
                    </div>

                    <DiseaseTable diseases={diseases} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
            </div>

            <DiseaseDialog open={diseaseDialogOpen} onOpenChange={setDiseaseDialogOpen} disease={selectedDisease} isEditing={isEditing} />

            <DeleteDialog open={deleteDialogOpen} onCancel={() => setDeleteDialogOpen(false)} onConfirm={confirmDelete} isLoading={isDeleting} />
        </AppLayout>
    );
}
