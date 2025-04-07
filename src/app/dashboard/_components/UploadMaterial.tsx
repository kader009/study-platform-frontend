'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface UploadMaterialModalProps {
  open: boolean;
  onClose: () => void;
  sessionId: string;
  sessionTitle: string;
  tutorEmail: string;
}

const UploadMaterialModal = ({
  open,
  onClose,
  sessionId,
  sessionTitle,
  tutorEmail,
}: UploadMaterialModalProps) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [googleDriveLink, setGoogleDriveLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here (API call, etc.)
    console.log({ title, sessionId, tutorEmail, image, googleDriveLink });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Material for: {sessionTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter material title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input value={sessionId} disabled />
          <Input value={tutorEmail} disabled />
          <Input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          <Input
            placeholder="Enter Google Drive link"
            value={googleDriveLink}
            onChange={(e) => setGoogleDriveLink(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="destructive" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit Material</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadMaterialModal;
