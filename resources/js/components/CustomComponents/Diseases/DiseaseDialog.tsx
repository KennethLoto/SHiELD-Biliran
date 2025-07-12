import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';

type Disease = {
    id: string;
    name: string;
    short_description: string;
};

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    disease?: Disease | null;
    isEditing?: boolean;
}

export function DiseaseDialog({ open, onOpenChange, disease, isEditing = false }: Props) {
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        short_description: '',
        id: '',
    });

    useEffect(() => {
        if (isEditing && disease) {
            setData({
                id: disease.id,
                name: disease.name,
                short_description: disease.short_description,
            });
        } else {
            reset();
        }
        // Clear errors when dialog opens/closes
        clearErrors();
    }, [disease, isEditing, open]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && disease) {
            put(`/diseases/${disease.id}`, {
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                },
            });
        } else {
            post('/diseases', {
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                },
            });
        }
    };

    const handleCancel = () => {
        onOpenChange(false);
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit Disease' : 'Add New Disease'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Enter disease name"
                            autoFocus
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="grid gap-3">
                        <Label htmlFor="short_description">Short Description</Label>
                        <Textarea
                            id="short_description"
                            value={data.short_description}
                            onChange={(e) => setData('short_description', e.target.value)}
                            placeholder="Enter short description"
                            rows={3}
                        />
                        {errors.short_description && <p className="text-sm text-red-500">{errors.short_description}</p>}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Adding...' : isEditing ? 'Update' : 'Add'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
