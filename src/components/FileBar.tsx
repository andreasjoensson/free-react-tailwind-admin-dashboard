import axiosInstance from '../utils/axiosInstance';

const FileBar = ({ savedFiles, savedUrls, name }: any) => {
  const handleSaveButtonClick = () => {
    const formData = new FormData();
    savedFiles.forEach((file: any, index: any) => {
      formData.append('savedFiles', file.file);
    });
    formData.append('savedUrls', JSON.stringify(savedUrls));
    formData.append('name', name);

    axiosInstance
      .post('/bot/create', formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error creating bot:', error);
      });
  };

  return (
    <div className="w-full bg-black p-4 text-white">
      <div className="container mx-auto">
        <h2 className="text-lg font-semibold mb-2 text-white">Saved Files</h2>
        <div className="flex flex-wrap">
          {savedFiles.map((file: any) => (
            <div
              key={file.file.name}
              className="bg-blue-500 text-white p-2 m-2 rounded-md"
            >
              {file.file.name} Type: {file.file.type}
            </div>
          ))}
        </div>
        <h2 className="text-lg font-semibold mb-2 mt-4 text-white">
          Saved URLs
        </h2>
        <div className="flex flex-wrap">
          {savedUrls.map((url: string, index: number) => (
            <div
              key={index}
              className="bg-green-500 text-white p-2 m-2 rounded-md"
            >
              {url}
            </div>
          ))}
        </div>
        <button
          className="mt-4 bg-white text-black px-4 py-2 rounded-md"
          onClick={handleSaveButtonClick}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FileBar;
