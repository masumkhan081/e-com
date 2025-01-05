const isFilesMap = (files: unknown): files is { [fieldname: string]: File[] } => {
    return files != null && typeof files === 'object' && !Array.isArray(files);
  };
  
  let uploadedFile: File | undefined;
  
  if (isFilesMap(req.files)) {
    uploadedFile = req.files?.[field.name]?.[0];
  }
  