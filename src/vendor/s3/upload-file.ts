import { saveFile } from './save-file';

export const uploadFile = async (file: any): Promise<void> => {
  await saveFile(file.filename);
};
