import { supabase } from '@/app/lib/supabase/client';

export const uploadImage = async (
  file: File,
  propertyId: string
): Promise<string | null> => {

  // 🔍 DEBUG AUTH
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  console.log('UPLOAD USER:', user);
  console.log('AUTH ERROR:', authError);

  if (!user) {
    alert('You must be logged in to upload.');
    return null;
  }

  const filePath = `${propertyId}/${Date.now()}_${file.name}`;
  console.log('UPLOAD PATH:', filePath);

  const { data, error } = await supabase.storage
    .from('properties')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    console.error('STORAGE ERROR:', error);
    return null;
  }

  const { data: publicData } = supabase.storage
    .from('properties')
    .getPublicUrl(filePath);

  console.log('PUBLIC URL:', publicData.publicUrl);

  return publicData.publicUrl;
};
